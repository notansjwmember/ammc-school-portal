import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

import Popup from "../../components/Popup/Popup";
import LogoIcon from "../../assets/images/logo.png";
import styles from "./ForgotPassword.module.scss";

import { useForgetPassword } from "../../hooks/useForgetPassword";
import Loading from "../../components/Loading/Loading";

const ForgotPassword = () => {
   const { popupState, showPopup, setShowPopup, forgotPassword } =
      useForgetPassword();

   const [isEmailSent, setIsEmailSent] = useState(false);
   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      setLoading(true);

      try {
         const response = await forgotPassword(data, reset);

         if (response.ok) {
            setIsEmailSent(true);
         }
      } finally {
         setLoading(false);
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className={styles.container}>
         <Helmet>
            <title>Dr. AMMC | Forgot Password</title>
         </Helmet>
         <div className={styles.content}>
            <div className={styles.head}>
               <img src={LogoIcon} alt="Dr. AMMC Seal" />
               <h1 className={styles.title}>
                  {isEmailSent ? "Recover Your Account" : "Reset Your Password"}
               </h1>
               <p className={styles.desc}>
                  {isEmailSent
                     ? "A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password."
                     : "Don't worry, we got you. We'll email you instructions to reset your password. If you don't have access to the email anymore, you can try and contact IT support."}
               </p>
            </div>
            {isEmailSent ? (
               <a href="login" className={styles.returnBtn}>
                  <button type="button">Return to Sign In</button>
               </a>
            ) : (
               <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  <label htmlFor="username">
                     Username/Student ID{" "}
                     {errors.username && (
                        <span className={styles.errorMsg}>
                           ({errors.username.message})
                        </span>
                     )}
                  </label>
                  <input
                     className={styles.usernameInput}
                     type="text"
                     {...register("username", {
                        required: "This field is required",
                     })}
                  />
                  <div className={styles.buttons}>
                     <button type="submit" disabled={loading}>
                        Reset Password {loading && <Loading />}
                     </button>
                     <a href="login">Return to Sign In</a>
                  </div>
               </form>
            )}

            <Popup
               icon={popupState.icon}
               border={popupState.border}
               color={popupState.color}
               title={popupState.title}
               message={popupState.message}
               onClose={handleClosePopup}
               show={showPopup}
            />
         </div>
      </div>
   );
};

export default ForgotPassword;