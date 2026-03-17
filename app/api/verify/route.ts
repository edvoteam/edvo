import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // find matching code
    const { data, error } = await supabase
    .from("verification_codes")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
     .limit(1)
    .single();

    if (!data || data.code !== code) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // check expiry
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: "Code expired" }, { status: 400 });
    }

    // update user as verified
    const { error: updateError } = await supabase
      .from("users")
      .update({ is_verified: true })
      .eq("email", email);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Verified successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}