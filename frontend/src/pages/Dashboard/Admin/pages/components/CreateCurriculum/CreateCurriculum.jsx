import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Loading from "components/Loading/Loading";
import CourseMapping from "../CourseMapping/CourseMapping";
import { FormSelect } from "components/ui/Form";
import usePostData from "hooks/usePostData";

import styles from "./CreateCurriculum.module.scss";

const CreateCurriculum = ({
   token,
   users,
   courses,
   selectedProgram,
   programData,
   handleNextStep,
   handlePreviousStep,
   onSuccess,
}) => {
   const [isSwitchOn, setIsSwitchOn] = useState(false);
   const [selectedCourses, setSelectedCourses] = useState([]);
   const [selectedElectiveCourses, setSelectedElectiveCourses] = useState([]);
   const [, setClickCounts] = useState({});

   const { register, handleSubmit } = useForm();
   const { postData, loading } = usePostData();

   const handleSwitch = () => {
      setIsSwitchOn((prev) => !prev);
      setClickCounts({});
      setSelectedCourses([]);
      setSelectedElectiveCourses([]);
   };

   const handleSelectCourse = (courseId) => {
      if (!isSwitchOn) {
         setSelectedCourses((prevSelectedCourses) =>
            prevSelectedCourses.includes(courseId)
               ? prevSelectedCourses.filter((c) => c !== courseId)
               : [...prevSelectedCourses, courseId]
         );
      } else {
         setClickCounts((prevCounts) => {
            const newCount = (prevCounts[courseId] || 0) + 1;
            const updatedCounts = {
               ...prevCounts,
               [courseId]: newCount % 3,
            };

            if (newCount % 3 === 1) {
               setSelectedCourses((prev) => [...prev, courseId]);
               setSelectedElectiveCourses((prev) =>
                  prev.filter((c) => c !== courseId)
               );
            } else if (newCount % 3 === 2) {
               setSelectedCourses((prev) => prev.filter((c) => c !== courseId));
               setSelectedElectiveCourses((prev) => [...prev, courseId]);
            } else {
               setSelectedCourses((prev) => prev.filter((c) => c !== courseId));
               setSelectedElectiveCourses((prev) =>
                  prev.filter((c) => c !== courseId)
               );
            }

            return updatedCounts;
         });
      }
   };

   const onSubmit = async (data) => {
      if (selectedCourses.length === 0) {
         return;
      }

      const payload = {
         ...data,
         courses: selectedCourses,
         electiveCourses: selectedElectiveCourses,
         programId: selectedProgram.programId,
      };

      await postData(payload, "curriculum", token);
      onSuccess();
   };

   return (
      <>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
         >
            <div className={styles.twoColumn}>
               <h2>Year Level</h2>
               <FormSelect
                  register={register}
                  name="year"
                  value="yearLevel"
                  options={Array.from(
                     { length: programData.duration },
                     (_, index) => ({
                        value: index + 1,
                        label: `Year ${index + 1}`,
                     })
                  )}
               />
            </div>
            <div className={styles.line}></div>
            <div className={styles.twoColumn}>
               <h2>Semester</h2>
               <FormSelect
                  register={register}
                  name="semester"
                  value="semester"
                  options={[
                     { value: "1", label: "1st Semester" },
                     { value: "2", label: "2nd Semester" },
                  ]}
               />
            </div>
            <div className={styles.line}></div>
            <CourseMapping
               courses={courses}
               users={users}
               selectedCourses={selectedCourses}
               selectedElectiveCourses={selectedElectiveCourses}
               handleSwitch={handleSwitch}
               isSwitchOn={isSwitchOn}
               handleSelectCourse={handleSelectCourse}
            />
            <div className={styles.buttonContainer}>
               <button
                  type="button"
                  onClick={handlePreviousStep}
                  className={styles.secondaryBtn}
               >
                  Previous step
               </button>
               <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className={styles.primaryBtn}
               >
                  Create curriculum {loading && <Loading />}
               </button>
            </div>
         </form>
      </>
   );
};

export default CreateCurriculum;