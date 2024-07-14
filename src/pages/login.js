import React, { useContext } from "react";
import axios from "../config/axios";
import { LOGIN_URL } from "../config/urls";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
 
  IonCol,
  IonList,
} from "@ionic/react";
import "../css/login.css"
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Storage } from '@capacitor/storage';

const Login = () => {

  const{setLoggedIn,setJwt} = useContext(AuthContext)

  const validationSchema = yup.object({

    email: yup
      .string()
      .nullable()
      .email("يجب ادخال البريد الالكتروني الصحيح")
      .required("البريد الالكتروني مطلوب"),

    password: yup
      .string()
      .nullable()
      .min(5,"يجب الا تقل كلمة المرور عن 5 محارف")
      .required("يجب ادخال كلمة المرور"),

     
  });
  const history = useHistory();


  const onSubmit = async (values) => {
    try {
      await axios.post(LOGIN_URL, values).then((res) => {
        Storage.set({
          key: 'accessToken',
          value: res.data.accessToken
        });
        console.log(res);
        setLoggedIn(true)
        setJwt(res.data.accessToken)
        history.push("/events");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>صفحة تسجيل الدخول</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={{
            email: null,
            password: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm({ values: "" });
          }}
        >
          {(formikProps) => (
         
             <form className="form-edit" onSubmit={formikProps.handleSubmit}>
                <div>
            
                
                  <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                  

                    

                   <IonList>
                   <IonItem>
                   <IonLabel color="warning" position="stacked"  fill="outline">
                        البريد الالكتروني
                      </IonLabel>
        <IonInput   
        name="email"
        color="danger"
        value={formikProps.values.email}
        onIonChange={formikProps.handleChange}
         labelPlacement="floating" 
         placeholder="example@examole.com"
         className="input-edit"
         ></IonInput>
                        
      </IonItem>
                   
                    <IonText className="error" color="danger">
                      {formikProps.touched.email && formikProps.errors.email}
                    </IonText>
                    <IonItem>
                      <IonLabel color="warning" position="stacked">
                        كلمة المرور
                      </IonLabel>
                      <IonInput
                        name="password"
                        type="password"
                        value={formikProps.values.password}
                        onIonChange={formikProps.handleChange}
                        className="input-edit-pass"
                      />
                    </IonItem>
                   </IonList>
                 

                    <IonText className="error" color="danger">
                      {formikProps.touched.password &&
                        formikProps.errors.password}
                    </IonText>

                   
                    <div className="btn ion-text-center ion-padding-bottom ion-padding-top">
                      <IonButton type="submit" onClick={onSubmit}>
                        تسجيل الدخول
                      </IonButton>
                    </div>
                    <div className="ion-text-center">
                      <IonRouterLink routerLink="/register" color="warning">
                        هل تريد تسجيل حساب جديد؟
                      </IonRouterLink>
                    </div>
                  </IonCol>
                
              
              </div>
            </form>
           
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};
export default Login;
