//!  <---------------- Without Supabase ------------------->
// import { NextResponse, NextRequest } from "next/server";
// import { prisma } from "@/libs/prisma";

// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json();

//     const { instagramUsername, email, plan, instagramProfilePic } = body;

//     if (!instagramUsername || !email || !plan) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Username, email and plan are required",
//         },
//         { status: 400 },
//       );
//     }

//     if (!["grow", "scale"].includes(plan)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid plan",
//         },
//         { status: 400 },
//       );
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     const existingSignup = await prisma.signup.findUnique({
//       where: {
//         email: normalizedEmail,
//       },
//     });
//     if (existingSignup) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "An account with this email already exists",
//         },
//         { status: 400 },
//       );
//     }

//     const signup = await prisma.signup.create({
//       data: {
//         email: normalizedEmail,
//         instagramUsername,
//         instagramProfilePic: instagramProfilePic || null,
//         plan,
//         // status: "PENDING_PAYMENT",
//       },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Signup created successfully",
//         data: signup,
//       },
//       {
//         status: 201,
//       },
//     );
//   } catch (error) {
//     console.error("Signup error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Something went wrong while creating signup",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// };

//? <-------------- WITH SUPABASE --------------->

// import { NextResponse, NextRequest } from "next/server";
// import { supabase } from "@/libs/supabase";
// import { _success } from "zod/v4/core";

// export const POST = async (req: NextRequest) => {
//   try {
//     const { instagramUsername, instagramProfilePic, email, plan } =
//       await req.json();

//     if (!instagramUsername || !email || !plan) {
//       return NextResponse.json(
//         { success: false, message: "Username, email and plan are required" },
//         { status: 400 },
//       );
//     }
//     if (!["grow", "scale"].includes(plan)) {
//       return NextResponse.json(
//         { success: false, message: "Invalid plan" },
//         { status: 400 },
//       );
//     }
//     const { data: existing } = await supabase
//       .from("signup")
//       .select("id")
//       .eq("email", email.trim().toLowerCase())
//       .maybeSingle();

//     if (existing) {
//       return NextResponse.json(
//         {
//           _success: false,
//           message: "An account with this email already exists",
//         },
//         { status: 400 },
//       );
//     }
//     const { data, error } = await supabase
//       .from("signup")
//       .insert({
//         instagram_username: instagramUsername,
//         instagram_profile_pic: instagramProfilePic || null,
//         email: email.trim().toLowerCase(),
//         plan,
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     return NextResponse.json({ success: true, data }, { status: 201 });
//   } catch (error) {
//     console.error("Signup error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Something went wrong while creating signup",
//       },
//       { status: 500 },
//     );
//   }
// };
