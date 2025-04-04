import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../config/axios";
import { GET_MYPROFILE_URL, UPLOAD_USER_PHOTO } from "../config/urls";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonIcon,
  IonAlert,
  IonAvatar,
  
} from "@ionic/react";

import { useHistory } from "react-router";
import { arrowForwardCircle,addOutline } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";
import { usePhotoGallery } from "../hooks/usePhotoGallery"

import avatar from "../abstract-user-flat-4.png"
import "../css/profile.css"


const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [disapled, setDisabled] = useState(true);
  const [userImg, setUserImg] = useState();


  const history = useHistory();
  const { jwt } = useContext(AuthContext);

  const takePhotoRef = useRef()


  const {takePhoto,blobUrl} = usePhotoGallery()

  

  useEffect(() => {
    if(blobUrl){
      setUserImg(blobUrl)
      uploadPhoto()
    }
  },[blobUrl])

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setShowLoading(true);

    try {
      await axios
        .get(GET_MYPROFILE_URL, {
          headers: {
            authorization: jwt,
          },
        })
        .then((res) => {
          setUserImg(res.data.img_uri);
          console.log(res.data);
          setName(res.data.name);
          setEmail(res.data.email);
          setShowLoading(false);
        });
    } catch (e) {
      console.log("e");
      setShowLoading(false);
    }
  };

  const onSubmit = async () => {
    setShowLoading(true);

    const updateForm = {
      "name": name,
      "password": password,
    };
    try {
      await axios
        .put(GET_MYPROFILE_URL, updateForm, {
          headers: {
            authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res.data);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false)
    }
  };


  const uploadPhoto = async() => {
    const photoData = new FormData();

    try{
        const response = await fetch(blobUrl)
        //الحصول على الملف
        const blob = await response.blob();

        photoData.append("avatar",blob)
        await axios.put(UPLOAD_USER_PHOTO,photoData,{
            headers:{
                Authorization:jwt
            }
        }).then(res => {
            console.log(res);
            getProfile()
        })
    } catch(e){
        console.log("response")
    }
}

  return (
    <IonPage>
        <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false);
              }}
              header={"تنبيه"}
              message={"هل تريد تعديل البيانات"}
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
      <IonBreadcrumbs>
        <IonBreadcrumb href="/events">
          Home
          <IonIcon slot="separator" icon={arrowForwardCircle}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/profile">Profile</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>الصفحة الشخصية</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="edit-form">
          <IonGrid>
            <IonRow>
              <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
              <div className="avatar-container">
                <IonAvatar className="avatar" >
                    {userImg 
                    ?
                    <IonImg src={userImg} file="avatar"  />
                    :
                    <IonImg src={avatar} />
                    }
                </IonAvatar>
                <IonIcon icon={addOutline}  ref={takePhotoRef} onClick={() => {takePhoto()} } color="light" className="user-icon" />
                </div>

                <IonItem>
                  <IonLabel color="warning" position="fixed">
                    الاسم
                  </IonLabel>
                  <IonInput
                    name="name"
                    value={name}
                    onIonChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel color="warning" position="floating">
                    البريد الالكتروني
                  </IonLabel>
                  <IonInput disabled name="email" value={email} />
                </IonItem>

                <IonItem>
                  <IonLabel color="warning" position="fixed">
                    كلمة المرور
                  </IonLabel>
                  <IonInput
                    name="password"
                    type="password"
                    value={password}
                    onIonChange={(e) => {
                      setPassword(e.target.value);
                      setDisabled(false)
                    }}
                   
                  />
                </IonItem>

                <div className="btn ion-text-center ion-padding-bottom ion-padding-top">
                  <IonButton disabled={disapled} onClick={() => {setShowAlert(true)}}>
                    تعديل البيانات
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
