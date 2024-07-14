import React, { useContext, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import axios from "../config/axios";
import { AuthContext } from "../context/AuthContext";
import {  EVENTS_URL, GET_MYBOOKING_URL } from "../config/urls";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonIcon,
  IonButton
} from "@ionic/react";
import { arrowForwardCircle } from "ionicons/icons";

import moment from "moment";

moment.locale("");

const Booking = () => {
  const [booking, setBooking] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const { jwt } = useContext(AuthContext);

  const [postId, setPostId] = useState();

    const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    getBooking();
  }, []);

  const onSubmit = async () => {
    setShowAlert(true)
    try {
      await axios
        .delete(EVENTS_URL + "/" + postId, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log("Event is deleted:", res.data);
          getBooking()
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getBooking = async () => {
    setShowLoading(true);

    try {
      await axios
        .get(GET_MYBOOKING_URL, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res.data.getBookings[0].Events);
          setBooking(res.data.getBookings[0].Events);
          setShowLoading(false);
          setShowAlert(false)
        });
    } catch (e) {
      console.error("Error creating event:", e.response ? e.response.data : e);
      setShowLoading(false);
    }
  };

  return (
    <IonPage>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/events">
          Home
          <IonIcon slot="separator" icon={arrowForwardCircle}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/booking">Booking</IonBreadcrumb>
      </IonBreadcrumbs>
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} />
      ) : (
        booking && (
          <>
           <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false);
              }}
              header={"تنبيه"}
              message={"هل تريد العاء المناسبة"}
              buttons={[
                {
                  text: "نعم",
                  handler: () => {
                    onSubmit();
                  },
                },
                {
                  text: "الغاء",
                  role: "cancel",
                },
              ]}
            />
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>صفحة حجوزاتي </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              {booking.length > 0 ? (
                booking.map((Events) => {
                  return (
                    
                    <IonCard key={Events.id}>
                      <IonGrid>
                        <IonRow>
                          <IonCol>

                          <IonCardHeader>
                        <IonCardTitle>{Events.title}</IonCardTitle>
                        <IonCardSubtitle>{Events.description}</IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent>{Events.price}$</IonCardContent>
                      <IonCardSubtitle>{moment(Events.date).format('MMMM Do YYYY')}</IonCardSubtitle>

                      <IonButton
                              onClick={() => {
                                setPostId(Events.id);
                                setShowAlert(true);
                              }}
                            >
                              الغاء 
                            </IonButton>


                          </IonCol>
                        </IonRow>
                      </IonGrid>
                   


                     
                                   
                    </IonCard>
                  );
                })
              ) : (
                <IonCardContent>لا يوجد حجوزات</IonCardContent>
              )}
            </IonContent>
          </>
        )
      )}
    </IonPage>
  );
};
export default Booking;
