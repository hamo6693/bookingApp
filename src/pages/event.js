/*
import React from "react"
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Event = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>صفحة المناسبات </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>

    )
}
export default Event
*/
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
    useIonAlert
  } from "@ionic/react";
  import { IonPage } from "@ionic/react";
  import "../css/event.css";

  import axios from "../config/axios";
  //جلب المعلومات
  import { EVENTS_URL } from "../config/urls";
  import {  useEffect, useState } from "react";
  //import { Storage } from "@capacitor/storage";
  //import { useHistory } from "react-router";
  import React from "react";
  
  const Event = () => {

    const [showLoading,setShowLoading] = useState(false);
    const [post,setPosts] = useState("");
    const [title,setTitle] = useState("");
    const [presentAlert] = useIonAlert();


    useEffect(() => {
      getEvent();
    }, []);

  
    const getEvent = async () => {
      setShowLoading(true)
      try {
        await axios
          .get(EVENTS_URL)
          .then((res) => {
            console.log(res.data.getEvent);
            setPosts(res.data.getEvent)
            console.log(res.data.getEvent[0].title)
            setTitle(res.data.getEvent[0].title)
            setShowLoading(false)
          });
      } catch (e) {
        console.log(e.response);
        setShowLoading(true)
      }
    }
    return (  
        <IonPage id="main-content">
          {showLoading 
          ? 
        <IonLoading isOpen={showLoading} duration={1000}/>
        : post&&
        <>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>صفحة المناسبات</IonTitle>
            <IonButton fill="clear" slot="end" color="tertiary" routerLink="/login">تسجيل الدخول</IonButton>

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
                    <IonCardTitle color="secondary">
                     المناسبات من حولك!
                    </IonCardTitle>
                  </IonCardHeader>
                  
                </IonCard>
              </IonCol>
              </div>
              
            </IonRow>
            </IonGrid>

            <IonGrid>
            <IonRow className="col-edit">
              <IonCol >
              {post.length > 0 ?
                post.map((post) => {
                  return(
                    
                  <IonCard key={post.id}>
                      
                      <IonCardHeader src={post}>
                        <IonCardTitle color="secondary">
                          {post.title}
                        </IonCardTitle>
                        <IonCardTitle color="secondary">
                                {post.description}
                              </IonCardTitle>
                        <IonCardSubtitle>{post.price}$</IonCardSubtitle>

                      </IonCardHeader>
                    
                      <IonButton color="primary"
                        onClick={() =>
                          presentAlert({
                            header : 'تفاصيل المناسبة',
                            subHeader: 'قم بتسجيل الدخول وسارع بالحجز',
                            message: `${post.description}`,
                            buttons: ['اغلاق'],
                          })
                        }
                      className="btn-edit"  
                      id="present-alert">
                        عرض التفاصيل
                        </IonButton>
                      
                      
                  </IonCard>
                  )
                })
            
              :
              <IonCard>
                 <IonCardHeader>
                    <IonCardTitle color="secondary">
                      لا توجد مناسبات لعرضها
                    </IonCardTitle>
                  </IonCardHeader>
              </IonCard>  
              } 
              </IonCol>
              
            </IonRow>
            </IonGrid>
           
          
              
               
              
            
             
          
         
          </IonContent>
        </>
        }
        
          
        </IonPage>
      
    );
  };
  
  
  export default Event;
  