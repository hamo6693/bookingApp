import React, { useContext } from "react";
import {
    IonList,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonIcon,
   
  } from "@ionic/react";
  import { Storage } from "@capacitor/storage";
  import { useHistory } from "react-router";
  import { AuthContext } from "../context/AuthContext";
import { bookmarks, logOutOutline, personCircleOutline } from "ionicons/icons";


const Menu = () => {
    const {jwt,setLoggedIn} = useContext(AuthContext);
    const history = useHistory()

    const logOut = async () => {
        await Storage.remove({key:"accessToken"})
        setLoggedIn(false)
        history.push("/")
    }

    return(
        <IonMenu side="start" contentId="main-content">
           
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>القائمة</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonList>
              <IonItem routerLink="/profile">
                <IonIcon color="primary" icon={personCircleOutline} />
                <IonLabel className="ion-margin">الصفحة الشخصية</IonLabel>
              </IonItem>
  
              <IonItem routerLink="/booking">
                <IonIcon color="primary" icon={bookmarks} />
                <IonLabel className="ion-margin">حجوزاتي</IonLabel>
              </IonItem>
  
              <IonItem routerLink="/" onClick={() => {logOut()}}>
                <IonIcon color="primary" icon={logOutOutline} />
                <IonLabel className="ion-margin">تسجيل الخروج</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
    )
}
export default Menu