import React, { useState, useEffect } from "react";
import { Check, ArrowRight, ArrowLeft, Upload, CheckCircle, Shield, SlidersHorizontal } from "lucide-react";
import { Nomination, NominationStatus } from "../types";

interface NominationFormProps {
  categories: { id: string; name: string }[];
  onAddNomination: (nomination: Nomination) => void;
}

export default function NominationForm({ categories, onAddNomination }: NominationFormProps) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [savingMsg, setSavingMsg] = useState("");

  // Form State
  const [form, setForm] = useState({
    nomineeName: "",
    nomineeEmail: "",
    nomineePhone: "",
    nomineeTitle: "",
    nomineeOrg: "",
    nomineeIndustry: "",
    nomineeCategory: "",
    nomineeState: "",
    achievements: "",
    impactDescription: "",
    supportingEvidenceUrl: "",
    nomineePortraitUrl: "",
    refereeName: "",
    refereeEmail: "",
    refereePhone: "",
    consent: false,
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simulate Autosave
  useEffect(() => {
    if (step > 1 && step < 7) {
      setSavingMsg("Autosaving draft...");
      const t = setTimeout(() => {
        setSavingMsg("Draft saved securely in browser cache.");
        setTimeout(() => setSavingMsg(""), 2000);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!form.nomineeName.trim()) stepErrors.nomineeName = "Nominee name is required.";
      if (!form.nomineeEmail.trim() || !form.nomineeEmail.includes("@")) stepErrors.nomineeEmail = "Provide a valid email address.";
      if (!form.nomineePhone.trim()) stepErrors.nomineePhone = "Phone number is required.";
    } else if (currentStep === 2) {
      if (!form.nomineeTitle.trim()) stepErrors.nomineeTitle = "Professional title is required.";
      if (!form.nomineeOrg.trim()) stepErrors.nomineeOrg = "Organization is required.";
      if (!form.nomineeCategory) stepErrors.nomineeCategory = "Please select an award category.";
      if (!form.nomineeIndustry) stepErrors.nomineeIndustry = "Please select or type an industry.";
      if (!form.nomineeState) stepErrors.nomineeState = "Select state of primary impact.";
    } else if (currentStep === 3) {
      if (!form.achievements.trim() || form.achievements.length < 50) {
        stepErrors.achievements = "Please detail achievements thoroughly (minimum 50 characters).";
      }
    } else if (currentStep === 4) {
      if (!form.impactDescription.trim() || form.impactDescription.length < 50) {
        stepErrors.impactDescription = "Please detail impact thoroughly (minimum 50 characters).";
      }
    } else if (currentStep === 6) {
      if (!form.refereeName.trim()) stepErrors.refereeName = "Referee name is required.";
      if (!form.refereeEmail.trim() || !form.refereeEmail.includes("@")) stepErrors.refereeEmail = "Provide referee's valid email.";
      if (!form.refereePhone.trim()) stepErrors.refereePhone = "Provide referee's phone number.";
    } else if (currentStep === 7) {
      if (!form.consent) stepErrors.consent = "Consent is required to submit.";
      if (!form.terms) stepErrors.terms = "You must accept the terms of the nomination.";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(7)) return;

    const newNom: Nomination = {
      id: `nom-${Date.now()}`,
      nomineeName: form.nomineeName,
      nomineeEmail: form.nomineeEmail,
      nomineePhone: form.nomineePhone,
      nomineeTitle: form.nomineeTitle,
      nomineeOrg: form.nomineeOrg,
      nomineeIndustry: form.nomineeIndustry,
      nomineeCategory: form.nomineeCategory,
      nomineeState: form.nomineeState,
      achievements: form.achievements,
      impactDescription: form.impactDescription,
      supportingEvidenceUrl: form.supportingEvidenceUrl || "https://example.com/uploaded_file.pdf",
      nomineePortraitUrl: form.nomineePortraitUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      refereeName: form.refereeName,
      refereeEmail: form.refereeEmail,
      refereePhone: form.refereePhone,
      status: NominationStatus.SUBMITTED,
      dateSubmitted: new Date().toISOString().split("T")[0]
    };

    onAddNomination(newNom);
    setSuccess(true);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const stepsList = [
    "Nominee Details",
    "Professional Background",
    "Key Achievements",
    "Systemic Impact",
    "Evidence & Files",
    "Referee Details",
    "Review & Submit"
  ];

  if (success) {
    return (
      <div id="nomination-success-card" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-brand-red flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-red/20">
          <Check className="w-10 h-10 text-white stroke-[3px]" />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
          NOMINATION SUBMITTED SECURELY
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Thank you for participating in the selection process. The UNDER50 Advisory Board and audit partners (PwC) will review this submission against the official leadership index benchmarks.
        </p>
        <div className="bg-brand-charcoal border border-brand-grey p-6 max-w-lg mx-auto text-left mb-12">
          <p className="text-xs text-brand-red font-black uppercase tracking-wider mb-2">Reference ID: U50-NOM-{(Math.random() * 100000).toFixed(0)}</p>
          <p className="text-sm text-gray-300">A confirmation receipt has been dispatched to <span className="text-white font-bold">{form.nomineeEmail}</span> and referee <span className="text-white font-bold">{form.refereeEmail}</span> with further instructions.</p>
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setForm({
              nomineeName: "",
              nomineeEmail: "",
              nomineePhone: "",
              nomineeTitle: "",
              nomineeOrg: "",
              nomineeIndustry: "",
              nomineeCategory: "",
              nomineeState: "",
              achievements: "",
              impactDescription: "",
              supportingEvidenceUrl: "",
              nomineePortraitUrl: "",
              refereeName: "",
              refereeEmail: "",
              refereePhone: "",
              consent: false,
              terms: false
            });
          }}
          className="border border-brand-red text-white text-xs uppercase tracking-widest font-black px-8 py-3.5 hover:bg-brand-red transition-all cursor-pointer"
        >
          Submit Another Nomination
        </button>
      </div>
    );
  }

  return (
    <div id="nomination-experience" className="max-w-4xl mx-auto px-6 py-12">
      {/* Editorial Title */}
      <div className="border-b border-brand-grey pb-8 mb-10 text-center">
        <span className="text-xs text-brand-red font-black uppercase tracking-widest block mb-2">Institutional Review</span>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">SUBMIT A NOMINATION</h1>
        <p className="text-gray-400 text-xs md:text-sm max-w-lg mx-auto mt-2">
          Identify and document exceptional Nigerians under 50 who are transforming industry landscapes and creating measurable societal progress.
        </p>
      </div>

      {/* Steps Progress Indicator */}
      <div className="hidden md:flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-grey -z-10" />
        {stepsList.map((stLabel, idx) => {
          const sNum = idx + 1;
          const isActive = step === sNum;
          const isDone = step > sNum;
          return (
            <div key={sNum} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-brand-red text-white"
                    : isActive
                    ? "bg-white text-black ring-4 ring-brand-red/30"
                    : "bg-brand-charcoal text-gray-500 border border-brand-grey"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : sNum}
              </div>
              <span
                className={`text-[9px] uppercase tracking-wider mt-2 font-black ${
                  isActive ? "text-brand-red" : isDone ? "text-white" : "text-gray-500"
                }`}
              >
                Step {sNum}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden flex items-center justify-between mb-8 bg-brand-charcoal p-4 border border-brand-grey">
        <span className="text-xs uppercase tracking-widest font-black text-gray-400">
          Step {step} of 7: <span className="text-white">{stepsList[step - 1]}</span>
        </span>
        <div className="w-12 h-1.5 bg-brand-grey rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-red transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Autosave / Status Indicator */}
      {savingMsg && (
        <div className="text-right text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-bold italic animate-pulse">
          {savingMsg}
        </div>
      )}

      {/* Multi-step Form Content */}
      <form onSubmit={handleSubmit} className="bg-brand-charcoal border border-brand-grey p-8 md:p-12 shadow-xl shadow-black/80">
        
        {/* STEP 1: Nominee Info */}
        {step === 1 && (
          <div id="step-1-nominee-info" className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3 mb-6">
              01. NOMINEE IDENTITY
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Nominee Full Name *
                </label>
                <input
                  type="text"
                  name="nomineeName"
                  value={form.nomineeName}
                  onChange={handleChange}
                  placeholder="e.g. Amina Adebayo"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.nomineeName && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeName}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Nominee Primary Email Address *
                </label>
                <input
                  type="email"
                  name="nomineeEmail"
                  value={form.nomineeEmail}
                  onChange={handleChange}
                  placeholder="e.g. amina@helios.ng"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.nomineeEmail && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeEmail}</p>}
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  name="nomineePhone"
                  value={form.nomineePhone}
                  onChange={handleChange}
                  placeholder="e.g. +234 803 123 4567"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.nomineePhone && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineePhone}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Professional Background */}
        {step === 2 && (
          <div id="step-2-professional-info" className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3 mb-6">
              02. PROFESSIONAL FRAMEWORK
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Official Title *
                </label>
                <input
                  type="text"
                  name="nomineeTitle"
                  value={form.nomineeTitle}
                  onChange={handleChange}
                  placeholder="e.g. Chief Executive Officer / Founder"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.nomineeTitle && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeTitle}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Institution or Organization *
                </label>
                <input
                  type="text"
                  name="nomineeOrg"
                  value={form.nomineeOrg}
                  onChange={handleChange}
                  placeholder="e.g. Helios Fintech"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.nomineeOrg && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeOrg}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Nomination Category *
                </label>
                <select
                  name="nomineeCategory"
                  value={form.nomineeCategory}
                  onChange={handleChange}
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red text-white cursor-pointer"
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.nomineeCategory && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeCategory}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Industry / Sub-sector *
                </label>
                <select
                  name="nomineeIndustry"
                  value={form.nomineeIndustry}
                  onChange={handleChange}
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red text-white cursor-pointer"
                >
                  <option value="">-- Choose Industry --</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Agritech">Agritech</option>
                  <option value="Clean Energy">Clean Energy</option>
                  <option value="Creative & Film">Creative & Film</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Venture Capital">Venture Capital</option>
                  <option value="Real Estate">Real Estate</option>
                </select>
                {errors.nomineeIndustry && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeIndustry}</p>}
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  State of Primary Impact (Nigeria) *
                </label>
                <select
                  name="nomineeState"
                  value={form.nomineeState}
                  onChange={handleChange}
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red text-white cursor-pointer"
                >
                  <option value="">-- Choose State --</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja (FCT)">Abuja (FCT)</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Kano">Kano</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Delta">Delta</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Kaduna">Kaduna</option>
                </select>
                {errors.nomineeState && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.nomineeState}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Key Achievements */}
        {step === 3 && (
          <div id="step-3-achievements" className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3 mb-6">
              03. MAJOR LEADERSHIP ACHIEVEMENTS
            </h3>
            
            <div className="flex flex-col space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold flex justify-between">
                <span>Summary of Achievements (Minimum 50 chars) *</span>
                <span className="font-mono text-[10px] text-gray-500">{form.achievements.length} chars</span>
              </label>
              <textarea
                name="achievements"
                value={form.achievements}
                onChange={handleChange}
                rows={6}
                placeholder="Detail key metrics, patents, volume of business scaled, capital raised, or institutional barriers broken under their direct stewardship..."
                className="bg-brand-black border border-brand-grey p-4 text-sm focus:outline-none focus:border-brand-red transition-all font-sans leading-relaxed"
              />
              <p className="text-[10px] text-gray-500 italic">Provide high-integrity quantitative proof metrics where possible (e.g., jobs created, percentage yields increased).</p>
              {errors.achievements && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.achievements}</p>}
            </div>
          </div>
        )}

        {/* STEP 4: Systemic Impact */}
        {step === 4 && (
          <div id="step-4-impact" className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3 mb-6">
              04. SOCIO-ECONOMIC & SYSTEMIC IMPACT
            </h3>
            
            <div className="flex flex-col space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold flex justify-between">
                <span>Why They Matter (Minimum 50 chars) *</span>
                <span className="font-mono text-[10px] text-gray-500">{form.impactDescription.length} chars</span>
              </label>
              <textarea
                name="impactDescription"
                value={form.impactDescription}
                onChange={handleChange}
                rows={6}
                placeholder="Explain how their leadership has impacted civil society, solved chronic inefficiencies, or positioned Nigeria on the global stage of technical excellence..."
                className="bg-brand-black border border-brand-grey p-4 text-sm focus:outline-none focus:border-brand-red transition-all font-sans leading-relaxed"
              />
              {errors.impactDescription && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.impactDescription}</p>}
            </div>
          </div>
        )}

        {/* STEP 5: Evidence & Files */}
        {step === 5 && (
          <div id="step-5-files" className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3 mb-6">
              05. PORTFOLIO EVIDENCE & PROFILES
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Image Upload Simulator */}
              <div className="border border-dashed border-brand-grey p-8 text-center bg-brand-black/30">
                <Upload className="w-10 h-10 text-brand-red mx-auto mb-3" />
                <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Simulate Portrait Image Upload</h4>
                <p className="text-xs text-gray-500 mb-4">Drag and drop or click to simulate high-resolution JPG or PNG (Max 5MB)</p>
                <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        nomineePortraitUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                      }));
                      alert("Simulated premium professional portrait upload successfully!");
                    }}
                    className="bg-brand-grey hover:bg-white hover:text-black text-[10px] text-white uppercase tracking-widest font-black px-4 py-2 transition-all cursor-pointer"
                  >
                    Use Sample Portrait A (Female)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        nomineePortraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                      }));
                      alert("Simulated premium professional portrait upload successfully!");
                    }}
                    className="bg-brand-grey hover:bg-white hover:text-black text-[10px] text-white uppercase tracking-widest font-black px-4 py-2 transition-all cursor-pointer"
                  >
                    Use Sample Portrait B (Male)
                  </button>
                </div>
                {form.nomineePortraitUrl && (
                  <p className="text-xs text-green-500 mt-3 font-bold flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Portrait file path verified!
                  </p>
                )}
              </div>

              {/* PDF upload */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Supporting Document Link (PDF, Press Coverage, Report)
                </label>
                <input
                  type="url"
                  name="supportingEvidenceUrl"
                  value={form.supportingEvidenceUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://mycompany.com/report.pdf or google drive folder"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Referee Details */}
        {step === 6 && (
          <div id="step-6-referee-info" className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3 mb-6">
              06. NOMINATION REFEREE / VERIFIER
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed bg-brand-black p-4 border-l-2 border-brand-red">
              To verify credentials, every nomination requires an endorsement from an industry referee (e.g. board member, corporate auditor, senior colleague, or regional council head).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Referee Full Name *
                </label>
                <input
                  type="text"
                  name="refereeName"
                  value={form.refereeName}
                  onChange={handleChange}
                  placeholder="e.g. Professor Kenneth Okafor"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.refereeName && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.refereeName}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Referee Email *
                </label>
                <input
                  type="email"
                  name="refereeEmail"
                  value={form.refereeEmail}
                  onChange={handleChange}
                  placeholder="e.g. k.okafor@university.edu"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.refereeEmail && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.refereeEmail}</p>}
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Referee Contact Phone *
                </label>
                <input
                  type="tel"
                  name="refereePhone"
                  value={form.refereePhone}
                  onChange={handleChange}
                  placeholder="e.g. +234 805 123 4567"
                  className="bg-brand-black border border-brand-grey p-3.5 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
                {errors.refereePhone && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.refereePhone}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Review & Submit */}
        {step === 7 && (
          <div id="step-7-review-submit" className="space-y-8">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-brand-grey pb-3">
              07. FINAL INDUCTION DECLARATION
            </h3>

            {/* Quick Preview Grid */}
            <div className="bg-brand-black p-6 border border-brand-grey grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-500 uppercase tracking-widest font-black">Nominee Name</p>
                <p className="text-white text-sm font-bold mt-0.5">{form.nomineeName}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest font-black">Category</p>
                <p className="text-brand-red text-sm font-bold mt-0.5">{form.nomineeCategory}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest font-black">Designation</p>
                <p className="text-white text-sm mt-0.5">{form.nomineeTitle} at {form.nomineeOrg}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest font-black">Primary Region</p>
                <p className="text-white text-sm mt-0.5">{form.nomineeState} State, Nigeria</p>
              </div>
              <div className="md:col-span-2 border-t border-brand-grey/40 pt-4">
                <p className="text-gray-500 uppercase tracking-widest font-black">Achievements Summary</p>
                <p className="text-gray-300 mt-1 leading-relaxed italic">"{form.achievements}"</p>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-brand-red border-brand-grey bg-brand-black focus:ring-brand-red cursor-pointer"
                />
                <label className="text-xs text-gray-400 leading-relaxed">
                  I hereby declare that all metrics, biographical statements, and supporting portfolio evidence provided in this nomination are true, accurate, and verifiable. I understand that the Advisory Board and PwC reserves the right to disqualify submissions containing fraudulent metrics. *
                </label>
              </div>
              {errors.consent && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.consent}</p>}

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-brand-red border-brand-grey bg-brand-black focus:ring-brand-red cursor-pointer"
                />
                <label className="text-xs text-gray-400 leading-relaxed">
                  I agree to the UNDER50 Nigeria index guidelines, selection processes, and audit protocols. *
                </label>
              </div>
              {errors.terms && <p className="text-xs text-brand-red font-bold uppercase tracking-wider">{errors.terms}</p>}
            </div>

            <div className="flex items-center space-x-2 bg-brand-charcoal border border-brand-grey/50 p-4 rounded-none text-[10px] text-gray-500 uppercase tracking-wider">
              <Shield className="w-5 h-5 text-brand-red flex-shrink-0" />
              <span>Protected by premium End-to-End database encryption protocols for sensitive executive files.</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-brand-grey/50 pt-8 mt-10">
          {step > 1 ? (
            <button
              type="button"
              id="nom-back-btn"
              onClick={handleBack}
              className="border border-brand-grey text-white text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-white hover:text-black transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button
              type="button"
              id="nom-next-btn"
              onClick={handleNext}
              className="bg-brand-red text-white text-xs uppercase tracking-widest font-bold px-8 py-3.5 hover:bg-brand-red-hover transition-all flex items-center space-x-2 cursor-pointer shadow-md shadow-brand-red/15"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              id="nom-submit-btn"
              className="bg-brand-red text-white text-xs uppercase tracking-widest font-black px-10 py-4 hover:bg-brand-red-hover transition-all flex items-center space-x-2 cursor-pointer shadow-lg shadow-brand-red/20"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>Submit Formal Nomination</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
