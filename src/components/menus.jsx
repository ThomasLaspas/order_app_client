import "../mainpage.css";

export default function Menu({ name, price, setname, setprice, onDelete }) {
  return (
    <div className="items">
      <section>
        <label for="name">Name</label>

        <input
          className="updateinput"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Add new menu"
        />
      </section>
      <section>
        <label for="name">Price ($)</label>

        <input
          className="updateinput"
          type="text"
          name="name"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          placeholder="Add new menu"
        />
      </section>
      <button onClick={onDelete} type="button" className="upbtns">
        Delete
      </button>
    </div>
  );
}
