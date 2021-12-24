import { useState } from "react";

const Admin = (props) => {
  const [eventName, setEventName] = useState("");
  const [table, setTable] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = (e)=>{
    e.preventDefault();
    console.log(eventName, table)
    props.addPass(eventName, table, image);
  }
  return (
    <section className="content">
      {/* CONTACT SECTION */}
      <div className="contact-section">
        <div className="container">
          <div className="contact-section-wrap grid grid-cols-12 gap-24">
            <div className="the-title text-left col-span-9 sm:col-span-12 res:col-span-12">
              <div className="contact-title">
                <h2 className="head-title-1">Add Event</h2>
              </div>
              <div className="contact-form-style">
                <input
                  type="text"
                  name="your-name"
                  size={40}
                  placeholder="Name of Event"
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="your-name"
                  size={40}
                  placeholder="URL of Image"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <select id="" onChange={(e) => setTable(e.target.value)} required>
                  <option selected disabled value="">
                    TABLE
                  </option>
                  <option value="STANDARD">Standard</option>
                  <option value="VIP">VIP</option>
                  <option value="VVIP">VVIP</option>
                </select>
                <input
                  onClick={submitHandler}
                  type="submit"
                  defaultValue="Send"
                  className="button-basic-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTACT END */}
      {/* TITLE CONTACT */}
      <div className="big-title">
        <div className="the-title text-right">
          <h1>Add event</h1>
        </div>
      </div>
    </section>
  );
};

export default Admin;
