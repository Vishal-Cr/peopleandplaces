import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";
import "../Form-components/styles/Input.css"; //css classes are available globally.
import Button from "../Form-components/Button";

const imageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef(); //Idea to use file picker input without seeing it.

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false; //This is because states are cued in order and sometimes old value is passed when it's yet to update.
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = (e) => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onClick={pickedHandler}
      />
      <div className={`image-upload ${props.center}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Pick an Image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default imageUpload;
