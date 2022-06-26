import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../places/PlaceList";
import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../UI-elements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";

const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  const fetchedUserId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${fetchedUserId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, fetchedUserId]);

  //Recieved the deletedPlaceId from placelist Comp.
  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
