import React, { useRef } from "react";
import "./ImageUpload.css";
import "../Form-components/styles/Input.css"; //css classes are available globally.

const imageUpload = (props) => {
  const filePickerRef = useRef(); //Idea to use file picker input without seeing it.

  const pickedHandler = (e) => {
    console.log(e.target);
  };

  const pickImageHandler = (e) => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        type="file"
        onChange={pickedHandler}
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <button type="button" onClick={pickImageHandler}>
          Pick Image
        </button>
      </div>
    </div>
  );
};

export default imageUpload;
