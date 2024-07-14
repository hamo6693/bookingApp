import React from "react";
import axios from "../config/axios";
import { REGISTER_URL } from "../config/urls";
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
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";

import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";

const Register = () => {
  const validationSchema = yup.object({
    name: yup.string().nullable().required("اسم المستخدم مطلوب"),

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

      confPassword: yup
      .string()
      .nullable()
      .min(5, "less 5 letter")
      .required("يجب ادخال كلمة المرور")
      .test("match", "كلمة المرور غير مطابقة", function (confPassword) {
        return confPassword === this.parent.password;
      }),
  });
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await axios.post(REGISTER_URL, values).then((res) => {
        console.log(res);
        history.push("/login");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>صفحة مستخدم جديد</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={{
            name: null,
            email: null,
            password: null,
            confPassword:null
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm({ values: "" });
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <IonGrid>
                <IonRow>
                  <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                    <img
                      className="--border-radius"
                      alt="Silhouette of a person's head"
                      src="https://ionicframework.com/docs/img/demos/avatar.svg"
                    />

                    <IonImg />

                    <IonItem>
                      <IonLabel color="warning" position="floating">
                        الاسم
                      </IonLabel>
                      <IonInput
                        name="name"
                        value={formikProps.values.name}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <IonText className="error" color="danger">
                      {formikProps.touched.name && formikProps.errors.name}
                    </IonText>
                    <IonItem>
                      <IonLabel color="warning" position="floating">
                        البريد الالكتروني
                      </IonLabel>
                      <IonInput
                        name="email"
                        value={formikProps.values.email}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <IonText className="error" color="danger">
                      {formikProps.touched.email && formikProps.errors.email}
                    </IonText>
                    <IonItem>
                      <IonLabel color="warning" position="floating">
                        كلمة المرور
                      </IonLabel>
                      <IonInput
                        name="password"
                        type="password"
                        value={formikProps.values.password}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>

                    <IonText className="error" color="danger">
                      {formikProps.touched.password &&
                        formikProps.errors.password}
                    </IonText>

                    <IonItem>
                      <IonLabel color="warning" position="floating">
                        تاكيد كلمة المرور
                      </IonLabel>
                      <IonInput
                        name="confPassword"
                        type="password"
                        value={formikProps.values.confPassword}
                        onIonChange={formikProps.handleChange}
                      />
                    </IonItem>
                    <IonText className="error" color="danger">
                      {formikProps.touched.confPassword &&
                        formikProps.errors.confPassword}
                    </IonText>
                    <div className="btn ion-text-center ion-padding-bottom ion-padding-top">
                      <IonButton type="submit" onClick={onSubmit}>
                        انشاء حساب
                      </IonButton>
                    </div>
                    <div className="ion-text-center">
                      <IonRouterLink routerLink="login" color="warning">
                        هل تريد تسجيل الدخول تسجل الدخول؟
                      </IonRouterLink>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};
export default Register;
