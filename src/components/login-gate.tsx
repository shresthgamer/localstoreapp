import { useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";

export function LoginGate() {
  const business = useAppStore((s) => s.business);
  const setSession = useAppStore((s) => s.setSession);
  const [phone, setPhone] = useState(business.ownerPhone);
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  function send() {
    if (phone.replace(/\D/g, "").length < 10) {
      toast.error("Enter a 10-digit mobile number");
      return;
    }
    setSent(true);
    toast.success("OTP sent — use 1234 for this demo");
  }

  function verify() {
    if (otp.trim() !== "1234") {
      toast.error("Incorrect OTP. Use 1234");
      return;
    }
    setSession(true);
    toast.success(`Welcome back, ${business.ownerName}`);
  }

  return (
    <div className="guest-page flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm panel-lg p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={business.logo} alt="" className="size-14 rounded-full object-cover shadow-card" />
          <p className="eyebrow mt-4">Druto</p>
          <h1 className="text-2xl mt-1">{business.name}</h1>
          <p className="text-sm text-muted mt-2">Owner sign-in</p>
        </div>
        <label className="eyebrow">Mobile number</label>
        <input className="field mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" />
        {sent ? (
          <>
            <label className="mt-4 block eyebrow">OTP</label>
            <input
              className="field mt-2 tracking-[0.4em]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              inputMode="numeric"
              placeholder="1234"
            />
            <button type="button" onClick={verify} className="btn-primary w-full mt-5">
              Continue
            </button>
          </>
        ) : (
          <button type="button" onClick={send} className="btn-primary w-full mt-5">
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
}
