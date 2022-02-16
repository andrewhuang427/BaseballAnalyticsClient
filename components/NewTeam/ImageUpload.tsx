import Add from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from "react";
import styles from "../../styles/Home.module.css";

const dimensions = 50;
const br = "50px";

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const clearImage = () => {
    setImage(null);
  };

  const promptForImage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    if (fileInputRef.current === null || fileInputRef.current === undefined)
      return;
    fileInputRef.current.click();
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className={styles.container}>
      <form>
        {preview ? (
          <img
            style={{
              width: dimensions,
              height: dimensions,
              borderRadius: br,
              objectFit: "cover",
              cursor: "pointer",
            }}
            src={preview}
            onClick={clearImage}
          />
        ) : (
          <IconButton
            style={{
              border: "2px solid #777777",
              height: dimensions,
              width: dimensions,
            }}
            onClick={promptForImage}
          >
            <Add />
          </IconButton>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImage}
        />
      </form>
    </div>
  );
}
