import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import "./styles/PlaceItem.css";
import Modal from "../Modal/Modal";
import Map from "../Modal/Map";
import CardContent from "@mui/material/CardContent";
import { AuthContext } from "../context/AuthContext";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UI-elements/LoadingSpinner";
import ErrorModal from "../Modal/ErrorModal";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const { isError, sendRequest, isLoading, clearError } = useHttpClient();
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      ); //Body or extra headers are not needed.
      props.onDelete(props.id);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <button onClick={closeMapHandler} className="footer__btn">
            Close
          </button>
        }
      >
        <div
          className="map-container"
          style={{ width: "100%", height: "100%" }}
        >
          <Map location={props.location} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are You Sure?"
        footer={
          <React.Fragment>
            <button onClick={cancelDeleteHandler} className="card_btn">
              Cancel
            </button>
            <button onClick={confirmDeleteHandler} className="card_btn">
              Delete
            </button>
          </React.Fragment>
        }
      >
        <p style={{ color: "#fff", fontSize: "18px" }}>
          Do You Want to Proceed? Please Note: it cannot be reversed.
        </p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <Card
        className="card"
        sx={{
          backgroundColor: "#dddada",
          backgroundFilter: "blur(5px)",
          borderRadius: "26px",
          boxShadow:
            "35px 35px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardContent
          className="card_container"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <li className="place-item">
            <div className="card_image_container">
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}/${props.image}`}
                className="card_image"
                alt={props.title}
              />
            </div>
            <div className="card_info">
              <h3
                style={{
                  color: "orange",
                  textDecoration: "underline overline",
                }}
              >
                {props.title}
              </h3>

              <h5>{props.address}</h5>
              <p>{props.description}</p>
            </div>
            <div className="btn_div">
              <button
                type="text"
                className="card_btn map"
                onClick={openMapHandler}
              >
                View On Map
              </button>
              {auth.userId == props.creatorId && (
                <button type="text" className="card_btn edit">
                  <Link className="Link" to={`/places/${props.id}`}>
                    Edit
                  </Link>
                </button>
              )}
              {auth.userId == props.creatorId && (
                <button
                  type="text"
                  className="card_btn delete"
                  onClick={showDeleteWarningHandler}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default PlaceItem;
