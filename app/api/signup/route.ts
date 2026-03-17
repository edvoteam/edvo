import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // expiry (10 minutes from now)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // insert user
    const { error: userError } = await supabase.from("users").insert([
      {
        name,
        email,
        password: hashedPassword,
      },
    ]);

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // insert verification code
    const { error: codeError } = await supabase
      .from("verification_codes")
      .insert([
        {
          email,
          code,
          expires_at: expiresAt,
        },
      ]);

    if (codeError) {
      return NextResponse.json({ error: codeError.message }, { status: 400 });
    }

    console.log("Verification code:", code); // TEMP (we'll email later)

    return NextResponse.json({ message: "User created" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}