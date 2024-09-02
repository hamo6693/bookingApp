import React from "react";
import {
  IonMenuButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonLoading,
  IonContent,
  IonCardSubtitle,
  IonAlert,
  IonImg,
} from "@ionic/react";
import { IonPage } from "@ionic/react";
import "../css/event.css";

import axios from "../config/axios";
import { EVENTS_URL, GET_MYBOOKING_URL } from "../config/urls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";

import moment from "moment";

moment.locale("");

const Events = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [post, setPosts] = useState([]);

  const [postId, setPostId] = useState();
  const [name, setName] = useState();
  const [imgUser, setImgUser] = useState();

  const { jwt } = useContext(AuthContext);


  useEffect(() => {
    getEvent();
    getBooking()
  }, []);

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
         setName(res.data.getBookings[0].name);
         setImgUser(res.data.getBookings[0].img_uri);
        });
    } catch (e) {
      console.error("Error creating event:", e.response ? e.response.data : e);
      setShowLoading(false);
    }
  };

  const onSubmitAdd = async () => {
    try {
      await axios
        .put(
          EVENTS_URL + "/" + postId,
          {},
          {
            headers: {
              Authorization: jwt,
            },
          }
        )
        .then((res) => {
          console.log("Event is deleted:", res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getEvent = async () => {
    setShowLoading(true);
    try {
      await axios
        .get(EVENTS_URL, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log("Events fetched successfully:", res.data.getEvent);
          setPosts(res.data.getEvent);

          setShowLoading(false);
        });
    } catch (e) {
      console.error("Error fetching events:", e.response ? e.response.data : e);
      setShowLoading(true);
    }
  };
  return (
    <IonPage id="main-content">
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} />
      ) : (
        post && (
          <>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false);
              }}
              header={"تنبيه"}
              message={"هل تريد حجز المناسبة"}
              buttons={[
                {
                  text: "نعم",
                  handler: () => {
                    onSubmitAdd();
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
                <IonTitle>صفحة المناسبات</IonTitle>
                <IonButton
                  fill="clear"
                  slot="end"
                  color="tertiary"
                  routerLink="/profile"
                >
                  مرحبا {name} 
                  
                  <img src={imgUser} className=" img-edit" />
                  
                </IonButton>

                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow>
                  <div className="col-center">
                    <IonCol sizeLg="4">
                      <IonCard className="edit-card">
                        <IonCardHeader>
                          <IonCardTitle color="primary">
                            شارك مناسبتك الخاصة!
                          </IonCardTitle>

                          <IonButton routerLink="/event" color="primary">
                            انشاء مناسبة
                          </IonButton>
                        </IonCardHeader>
                      </IonCard>
                    </IonCol>
                  </div>
                </IonRow>
              </IonGrid>

              <IonGrid className="center">
                <IonRow className="col-edit">
                  <IonCol>
                    {post.length > 0 ? (
                      post.map((post) => {
                        return (
                          <IonCard key={post.id} className="edit">
                            <IonCardHeader src={post}>
                              <IonCardTitle color="secondary">
                                {post.title}
                              </IonCardTitle>
                              <IonCardTitle color="secondary">
                                {post.description}
                              </IonCardTitle>
                              <IonCardSubtitle>{post.price}$</IonCardSubtitle>
                              <IonCardSubtitle>
                                {moment(post.date).format("MMMM Do YYYY")}
                              </IonCardSubtitle>
                            </IonCardHeader>

                            <IonButton
                              onClick={() => {
                                setPostId(post.id);
                                setShowAlert(true);
                              }}
                            >
                              احجز الان
                            </IonButton>
                          </IonCard>
                        );
                      })
                    ) : (
                      <IonCard>
                        <IonCardHeader>
                          <IonCardTitle color="secondary">no</IonCardTitle>
                        </IonCardHeader>
                      </IonCard>
                    )}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </>
        )
      )}
    </IonPage>
  );
};

export default Events;
