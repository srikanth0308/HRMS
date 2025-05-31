import React from "react";

const LightGalleryPage: React.FC = () => {
  return (
    <div className="card-body">
      <h2 className="card-title mb-3">Beautiful Gallery</h2>

      <div id="lightgallery" className="row lightGallery" style={{ gap: "12px" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <a
            key={num}
            href={`assets/1280x768/${num}.jpg`}
            className="image-tile"
            style={{ display: "inline-block", width: "calc(25% - 12px)", marginBottom: "5px", marginLeft:"5px" }}
          >
            <img
              src={`assets/${num}.jpg`}
              alt={`Gallery image ${num}`}
              style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
            />
          </a>
        ))}
      </div>

    </div>
  );
};

export default LightGalleryPage;
