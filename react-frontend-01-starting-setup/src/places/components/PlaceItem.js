import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import { AuthContext } from '../../shared/context/auth-context'
import './PlaceItem.css'

const PlaceItem = (props) => {
  
  const auth = useContext(AuthContext)
  
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  
  const toggleDeleteWarningHandler = () => {
    setShowConfirmModal(prev => !prev)
  }
  
  const confirmDeleteHandleer = () => {
    console.log("DELETED!")
    setShowConfirmModal(false)
  }
  
  const toggleMap = () => {
    setShowMap(prev => !prev)
  }
  
  return(
    <React.Fragment>
      <Modal 
        show={showMap} 
        onCancel={toggleMap} 
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.center} zoom={16} />
        </div>
      </Modal>
      
      <Modal 
        show={showConfirmModal}
        onCancel={toggleDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={toggleDeleteWarningHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandleer}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place? It can't be undone.</p>
      </Modal>
      
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={toggleMap}>VIEW ON MAP</Button>
            
            {
              auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
             {
              auth.isLoggedIn && (
              <Button danger onClick={toggleDeleteWarningHandler}>DELETE</Button>
            )}
            
          </div>
        </Card>
      </li>
    </React.Fragment>
    )
}

export default PlaceItem