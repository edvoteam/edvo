import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, password, yearLevel, subjects } = await req.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Insert user with year level
    const { data: newUser, error: userError } = await supabase
      .from("users")
      .insert([{
        name,
        email,
        password: hashedPassword,
        year_level: yearLevel || null,
      }])
      .select()
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // Save subjects if provided
    if (subjects && subjects.length > 0) {
      // Get subject IDs from names
      const { data: subjectRows, error: subjectFetchError } = await supabase
        .from("subjects")
        .select("id, name")
        .in("name", subjects);

      if (subjectFetchError) {
        return NextResponse.json({ error: subjectFetchError.message }, { status: 400 });
      }

      // Insert user_subjects
      const userSubjects = subjectRows.map((s: { id: string; name: string }) => ({
        user_id: newUser.id,
        subject_id: s.id,
      }));

      const { error: subjectInsertError } = await supabase
        .from("user_subjects")
        .insert(userSubjects);

      if (subjectInsertError) {
        return NextResponse.json({ error: subjectInsertError.message }, { status: 400 });
      }
    }

    // Insert verification code
    const { error: codeError } = await supabase
      .from("verification_codes")
      .insert([{ email, code, expires_at: expiresAt }]);

    if (codeError) {
      return NextResponse.json({ error: codeError.message }, { status: 400 });
    }

    console.log("Verification code:", code);

    return NextResponse.json({
      message: "User created",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        yearLevel: newUser.year_level,
      },
    });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}