function ColorPicker({ onThemeChange }) {
  return (
    <form className="color-picker" action="">
      <fieldset>
        <legend className="visually-hidden">Pick a color scheme</legend>
        <label htmlFor="light" className="visually-hidden">
          Light
        </label>
        <input
          type="radio"
          name="theme"
          id="light"
          value="light"
          onChange={onThemeChange}
          checked
        />

        <label htmlFor="pink" className="visually-hidden">
          Pink theme
        </label>
        <input
          type="radio"
          id="pink"
          name="theme"
          value="pink"
          onChange={onThemeChange}
        />

        <label htmlFor="blue" className="visually-hidden">
          Blue theme
        </label>
        <input
          type="radio"
          id="blue"
          name="theme"
          value="blue"
          onChange={onThemeChange}
        />

        <label htmlFor="green" className="visually-hidden">
          Green theme
        </label>
        <input
          type="radio"
          id="green"
          name="theme"
          value="green"
          onChange={onThemeChange}
        />

        <label htmlFor="dark" className="visually-hidden">
          Dark theme
        </label>
        <input
          type="radio"
          id="dark"
          name="theme"
          value="dark"
          onChange={onThemeChange}
        />
      </fieldset>
    </form>
  );
}

export default ColorPicker;