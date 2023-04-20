import React, { useContext, useState } from 'react';
import { collection, query, getDocs, getDoc, doc, where, orderBy, limit, serverTimestamp, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const Match = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation('match');
  const [bestMatch, setBestMatch] = useState(null);
  const [bestStrength, setBestStrength] = useState(null);
  const [randomNumber, setRandomNumber] = useState(Math.random());

  const handleMatchmaking = async () => {
    try {
      // Get the currently logged in user's interests
      const currentUserDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const currentUserInterests = currentUserDoc.data()?.interests;
      if (!currentUserInterests) {
        throw new Error('Current user does not have any interests set.');
      }

      // Query for 100 users randomly using a new random number each time
      const q = query(
        collection(db, 'users'),
        where('randomNumber', '>=', randomNumber),
        orderBy('randomNumber'),
        limit(100)
      );

// Exclude users that the current user has previously matched with
const matchesQuery = collection(db, 'matches');
const matchesSnapshot = await getDocs(matchesQuery);
const matchedUserIds = matchesSnapshot.docs
  .filter(doc => doc.data().user1 === currentUser.uid || doc.data().user2 === currentUser.uid)
  .map(doc => doc.data().user1 === currentUser.uid ? doc.data().user2 : doc.data().user1);

let filteredQuery = q;
if (matchedUserIds.length > 0) {
  filteredQuery = query(q, where('uid', 'not-in', matchedUserIds));
}

const querySnapshot = await getDocs(filteredQuery);


      // Find the user with the highest matchmaking strength rating
      let bestMatch = null;
      let bestStrength = -1;
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (!data.interests || doc.id === currentUser.uid) {
          return;
        }
        const strength = getMatchmakingStrength(currentUserInterests, data.interests);
        if (strength > bestStrength) {
          bestMatch = {
            uid: doc.id,
            displayName: data.displayName,
            photoURL: data.photoURL,
          };
          bestStrength = strength;
        }
      });

      if (bestMatch) {
        const combinedId = currentUser.uid > bestMatch.uid ? currentUser.uid + bestMatch.uid : bestMatch.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, 'chats', combinedId));

          if (!res.exists()) {
            // Create a chat in the 'chats' collection
            await setDoc(doc
      (db, 'chats', combinedId), { messages: [] });

        // Update user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: bestMatch.uid,
            displayName: bestMatch.displayName,
            photoURL: bestMatch.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', bestMatch.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        // Create a match document to prevent these users from being matched again
        await setDoc(doc(db, 'matches', combinedId), {
          user1: currentUser.uid,
          user2: bestMatch.uid,
          date: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(error);
    }
    setBestMatch(bestMatch);
  }

  // Update the randomNumber state to get a new set of 100 users on next button press
  setRandomNumber(Math.random());

} catch (error) {
  console.error(error);
}
};

const getMatchmakingStrength = (interests1, interests2) => {
let strength = 0;
if (interests1[0] === interests2[0]) {
strength += 2;
}
for (let i = 0; i < interests1.length; i++) {
if (interests2.includes(interests1[i])) {
strength += 1;
}
}
return strength;
};

return (
  <div>
    <button onClick={handleMatchmaking}>Find Best Match</button>
      {bestMatch && (
      <div className="userChat" onClick={() => setBestMatch(null)}>
      <img src={bestMatch.photoURL} alt="" />
      <div className="userChatInfo">
      <p>Matched with: {bestMatch.displayName}</p>
      <span className="strength">{t('strength', { strength: bestStrength })}</span>
    </div>
  </div>
)}
</div>
);

};

export default Match;