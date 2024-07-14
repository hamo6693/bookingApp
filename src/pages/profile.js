import React, { useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { GET_MYPROFILE_URL } from "../config/urls";
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
  IonIcon
} from "@ionic/react";


import { useHistory } from "react-router";
import { arrowForwardCircle } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [showLoading,setShowLoading] = useState(false)

    const [showAlert,setShowAlert] = useState(false)


  const history = useHistory();
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    getProfile()
  },[])



  const getProfile = async () => {
    setShowLoading(true)


    try {
      await axios.get(GET_MYPROFILE_URL,{
        headers:{
            authorization:jwt
        }
      }).then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setShowLoading(false)
      });
    } catch (e) {
      console.log(e);
      setShowLoading(false)

    }
  };

  const onSubmit = async () => {
    setShowLoading(true)


    const updateForm = {
        'name':name,
        'password':password
    }
    try {
      await axios.put(GET_MYPROFILE_URL,updateForm,{
        headers:{
            authorization:jwt
        }
      }).then((res) => {
        console.log(res.data);
        setShowLoading(false)
      });
    } catch (e) {
      console.log(e);
      
    }
  };

  return (
    <IonPage>
         <IonBreadcrumbs>
        <IonBreadcrumb href="/events">
          Home
          <IonIcon slot="separator" icon={arrowForwardCircle}></IonIcon>
        </IonBreadcrumb>
        <IonBreadcrumb href="/profile">Profile</IonBreadcrumb>
      </IonBreadcrumbs>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>صفحة مستخدم جديد</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
     
          
            <form>
              <IonGrid>
                <IonRow>
                  <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                 

                    <IonImg />

                    <IonItem>
                      <IonLabel color="warning" position="floating">
                       الاسم
                      </IonLabel>
                      <IonInput
                        name="name"
                        value={name}
                        onIonChange={(e)=>{setName(e.target.value)}}
                      />
                    </IonItem>
                    
                    <IonItem>
                      <IonLabel color="warning" position="floating">
                        البريد الالكتروني
                      </IonLabel>
                      <IonInput
                      disabled
                        name="email"
                        value={email}
                      />
                    </IonItem>
               
                    <IonItem>
                      <IonLabel color="warning" position="floating">
                        كلمة المرور
                      </IonLabel>
                      <IonInput
                        name="password"
                        type="password"
                        value={password}
                        onIonChange={(e)=>{setPassword(e.target.value)}}
                      />
                    </IonItem>

                   

                    <div className="btn ion-text-center ion-padding-bottom ion-padding-top">
                      <IonButton type="submit" onClick={onSubmit}>
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
