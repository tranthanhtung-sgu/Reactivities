import React, { useEffect, useState } from "react";
import { Button, Grid, GridRow, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
interface Props {
  loadingUpload: boolean;
  uploadPhoto: (file: Blob) => void;
}
export default function PhotoUploadWidget({ loadingUpload, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        uploadPhoto(blob!);
      });
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);
  return (
    <Grid>
      <GridRow>
        <Header style={{ marginLeft: "25px", marginBottom: "10px" }} sub content="Bước 1 - Thêm ảnh" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </GridRow>
      <GridRow>
        <Header style={{ marginLeft: "25px", marginBottom: "10px" }} sub content="Bước 2 - Điêu chỉnh kích cỡ ảnh" />
        {files && files.length > 0 && <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />}
      </GridRow>
      <GridRow>
        <Header style={{ marginLeft: "25px", marginBottom: "10px" }} sub content="Bước 3 - Xem & Đăng ảnh" />
        {files && files.length > 0 && (
          <>
            <div className="preview__img__container">
              <div
                className="img-preview rounded mx-auto d-block"
                style={{ minHeight: 200, overflow: "hidden", textAlign: "center" }}
              ></div>
            </div>
            <Button.Group widths={2} className="mt-4 mx-2" style={{ marginLeft: 10 }}>
              <Button
                loading={loadingUpload}
                onClick={onCrop}
                positive
                style={{ backgroundColor: "#1977f2" }}
                icon="check"
              />
              <Button loading={loadingUpload} onClick={() => setFiles([])} icon="close" />
            </Button.Group>
          </>
        )}
      </GridRow>
    </Grid>
  );
}
