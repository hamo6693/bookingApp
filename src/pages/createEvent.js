import React, { useContext, useState } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonInput,
  IonItem,
  IonContent,
  IonTextarea,
  IonButton,
  IonAlert,
  IonToast,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonIcon
} from "@ionic/react";

import "../css/createEvent.css";
import axios from "../config/axios";
import { AuthContext } from "../context/AuthContext";
import { CREATE_EVENT_URL } from "../config/urls";
import { useHistory } from "react-router";
import { arrowForwardCircle } from "ionicons/icons";


const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showContentToast, setShowContentToast] = useState(false);

  const history = useHistory();

  const { jwt } = useContext(AuthContext);



  const onSubmit = async () => {
    try {
      await axios
        .post(
          CREATE_EVENT_URL,
          { title: title, description: description, price: price,date:date },
          {
            headers: {
              Authorization: jwt,
            },
          }
        )
        .then((res) => {
          console.log("Event created successfully:", res.data);

          setTitle("");
          setDescription("");
          setPrice("");
          setDate("")
          setShowContentToast(false);
          setShowAlert(true);
        });
    } catch (e) {
      console.error("Error creating event:", e.response ? e.response.data : e);
      setShowContentToast(true);
      setShowAlert(false);
    }
  };

  return (
    <IonPage>
      <IonBreadcrumbs>
        <IonBreadcrumb href="/events">
          Home
          <IonIcon slot="separator" icon={arrowForwardCircle}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/profile">انشاء مناسبة</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="تمت عملية نشر المنشور بنجاح"
        message="لقد تم نشر المنشور يمكنك الانتقال الى صفحة الرئيسية"
        buttons={[
          {
            text: "موافق",
            handler: () => {
              history.push("/events");
            },
          },
        ]}
      />
      <IonToast
        isOpen={showContentToast}
        onDidDismiss={() => setShowContentToast(false)}
        message="يجب ادخال جميع الحقول"
        duration={1500}
        color="danger"
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>صفحة انشاء مناسبة </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="edit-list">
          <IonItem>
            <IonInput
              label="العنوان"
              value={title}
              onIonChange={(e) => setTitle(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              value={price}
              onIonChange={(e) => setPrice(e.target.value)}
              label="السعر"
              type="number"
              placeholder="$"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea
              value={description}
              onIonChange={(e) => setDescription(e.target.value)}
              label=" التفاصيل"
              counter={true}
              maxlength={20}
              counterFormatter={(inputLength, maxLength) =>
                `${maxLength - inputLength} characters remaining`
              }
            />
          </IonItem>
          <IonItem>
            <IonInput
            type="date"
              label=" التاريخ"
              value={date}
              onIonChange={(e) => setDate(e.target.value)}

             
            />
          </IonItem>
        </IonList>
        <IonButton className="button-edit" onClick={onSubmit}>
          sumbit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default CreateEvent;
