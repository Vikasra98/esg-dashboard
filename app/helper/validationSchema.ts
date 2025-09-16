// validationSchema.ts
import * as yup from "yup";

const disposableDomains =
  /(mailinator\.com|10minutemail\.com|guerrillamail\.com|tempmail\.|yopmail\.com)$/i;

export const waitlistSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(80, "Maximum 80 characters allowed")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ.'-](?:[A-Za-zÀ-ÖØ-öø-ÿ.'-]| [A-Za-zÀ-ÖØ-öø-ÿ.'-])*$/,
      "Numbers, special characters like @#$%*&* are not allowed"
    ),

  email: yup
    .string()
    .required("Email is required")
    .max(120, "Maximum 120 characters allowed")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    )
    .test(
      "disposable",
      "Disposable emails are not allowed",
      (value) => !disposableDomains.test(value || "")
    ),

  organization: yup
    .string()
    .max(120, "Maximum 120 characters allowed")
    .matches(/^[A-Za-z0-9À-ÖØ-öø-ÿ&.,\- ]+$/, "Invalid characters")
    .nullable(),

  role: yup
    .string()
    .required("Please select a Role")
    .oneOf(
      ["verifier", "institution", "developer", "other"],
      "Invalid selection"
    ),

  country: yup
    .string()
    .required("Please select a Country")
    .matches(/^[A-Z]{2}$/, "Invalid country code"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  consent: yup.boolean().oneOf([true], "You must agree before submitting"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .max(120, "Maximum 120 characters allowed")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(1, "Password is required"),
});

export const stayUpdatedSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("! Numbers, special characters like @#$%^&*")
    .max(80, "Maximum 80 characters allowed")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ.'-](?:[A-Za-zÀ-ÖØ-öø-ÿ.'-]| [A-Za-zÀ-ÖØ-öø-ÿ.'-])*$/,
      "Numbers, special characters like @#$%*&* are not allowed"
    ),

  email: yup
    .string()
    .required("! Free text without @ and")
    .max(120, "Maximum 120 characters allowed")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),

  organization: yup
    .string()
    .max(120, "! Excessive symbols (!!, ###)")
    .matches(/^[A-Za-z0-9À-ÖØ-öø-ÿ&.,\- ]+$/, "Invalid characters")
    .nullable(),

  // role: yup
  //   .string()
  //   .max(80, "! 80 characters")
  //   .matches(/^[A-Za-z0-9À-ÖØ-öø-ÿ .,'\-\/()]+$/, "Invalid characters")
  //   .nullable(),

  // userType: yup
  //   .string()
  //   .required("Please select a User Type")
  //   .oneOf(
  //     ["Verifier", "Institution", "Developer", "Other"],
  //     "Invalid selection"
  //   ),

  country: yup.string(),

  // website: yup
  //   .string()
  //   .url("Must be a valid URL starting with http:// or https://")
  //   .max(200, "Maximum 200 characters allowed")
  //   .nullable(),

  // motivation: yup
  //   .string()
  //   .max(500, "! HTML tags, script injections")
  //   .test(
  //     "no-html",
  //     "HTML tags are not allowed",
  //     (value) => !/<[^>]*>/.test(value || "")
  //   )
  //   .nullable(),

  // consent: yup.boolean().oneOf([true], "You must agree before submitting"),
});

export const companySchema = yup.object().shape({
  name: yup
    .string()
    .required("Company name is required")
    .max(80, "Maximum 80 characters allowed"),
  sector: yup
    .string()
    .required("Sector is required"),
  country: yup
    .string()
    .required("Country is required"),
  reg_number: yup
    .string()
    .required("Registration number is required")
    .max(50, "Maximum 50 characters allowed"),
  contact_name: yup
    .string()
    .required("Contact name is required")
    .max(80, "Maximum 80 characters allowed"),
  contact_email: yup
    .string()
    .required("Contact email is required")
    .max(120, "Maximum 120 characters allowed")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),
});
