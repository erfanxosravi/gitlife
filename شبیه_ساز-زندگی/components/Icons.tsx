import React from 'react';

// For Action Bar
export const BriefcaseIcon = ({ isActionbar }: { isActionbar?: boolean }) => {
    if (isActionbar) {
        return <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4z"/></svg>;
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    )
};
export const AssetsIcon = () => (
    <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="currentColor"><path d="M7 21h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 3H8C6.9 3 6 3.9 6 5v11.5c0 1.38 1.12 2.5 2.5 2.5h7c1.38 0 2.5-1.12 2.5-2.5V5c0-1.1-.9-2-2-2zm-5.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
);
export const RelationshipsIcon = () => (
    <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
);
export const ActivitiesIcon = () => (
    <svg className="w-8 h-8 mb-1" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM8 18h12v-2H8v2zm0-5h12v-2H8v2zm0-7v2h12V6H8z"/></svg>
);
export const AgeIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
);

// For Header
export const MenuIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
);

// --- Occupation Menu Icons ---
export const EducationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1 6.67 1 10 0v-5"/></svg>
);

export const PartTimeJobsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export const MilitaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export const SpecialCareersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2.5 2.5 0 0 1 2.5 2.5V6h-5V4.5A2.5 2.5 0 0 1 12 2z"/><path d="M6.5 6a2.5 2.5 0 0 0 0 5h11a2.5 2.5 0 0 0 0-5h-11z"/><path d="M6 6h.01"/><path d="M18 6h.01"/><path d="M6 11v9h12v-9"/><path d="M10 16h4"/></svg>
);

export const FreelanceGigsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h8zM2 10h10"/><path d="M18 20a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h2z"/><path d="M14 10h4"/></svg>
);

export const JobRecruiterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

export const FreelanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zM10 11a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6z" /></svg>;
export const SkillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8 8.25H3.14c-1.63 0-2.34 2.02-1.2 3.2l4.34 4.34c.4.4.4 1.03 0 1.43l-4.34 4.34c-1.14 1.18-.43 3.2 1.2 3.2H8l.51 5.08c.38 1.56 2.6 1.56 2.98 0L12 18.75h4.86c1.63 0 2.34-2.02 1.2-3.2l-4.34-4.34c-.4-.4-.4-1.03 0-1.43l4.34-4.34c1.14-1.18.43-3.2-1.2-3.2H12l-.51-5.08z" clipRule="evenodd" /></svg>;

// For Modals
export const QuitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>;
export const PromotionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-1.42 2.882a1 1 0 01-.762.55l-3.18.462a1 1 0 00-.554 1.705l2.3 2.24a1 1 0 01.287.882l-.543 3.168a1 1 0 001.45 1.053L9 14.4l2.845 1.496a1 1 0 001.45-1.053l-.543-3.168a1 1 0 01.287-.882l2.3-2.24a1 1 0 00-.554-1.705l-3.18-.462a1 1 0 01-.762-.55L10.894 2.553z" /></svg>;
export const WorkHardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.195.558-.27l.14-.044a1.25 1.25 0 01.882.215 1.25 1.25 0 01.442 1.439l-.014.03a1.25 1.25 0 01-1.274.966l-.213-.018a1.25 1.25 0 01-1.025-1.432zM11.567 7.418c-.158-.103-.346-.195-.558-.27l-.14-.044a1.25 1.25 0 00-.882.215 1.25 1.25 0 00-.442 1.439l.014.03a1.25 1.25 0 001.274.966l.213-.018a1.25 1.25 0 001.025-1.432zM8.99 4a1 1 0 011-1h.02c.264 0 .515.105.7.293l.4.4c.188.188.436.293.7.293h.02a1 1 0 110 2h-.02a1 1 0 01-.7-.293l-.4-.4A1 1 0 019.01 4H9a1 1 0 01-.01-1zM11.01 4a1 1 0 00-1-1h-.02c-.264 0-.515.105-.7.293l-.4.4c-.188.188-.436.293-.7.293h-.02a1 1 0 100 2h.02a1 1 0 00.7-.293l.4-.4A1 1 0 0010.99 4h.02z" /></svg>;
export const UniversityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414 0l3-3V17a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
export const HeartPulseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
export const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
export const CrimeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1.5 1.5 0 00-1.5 1.5v5.379a2.5 2.5 0 01-.879 1.768L5.293 13.828a1 1 0 001.414 1.414L9 12.914V16.5a1.5 1.5 0 003 0v-3.586l2.293 2.293a1 1 0 001.414-1.414l-2.328-2.328A2.5 2.5 0 0111.5 8.88V3.5A1.5 1.5 0 0010 2z" clipRule="evenodd" /></svg>;
export const MindBodyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path d="M3.5 2.5a2.5 2.5 0 00-3.447 3.447l1.028 1.028a.5.5 0 010 .707l-1.028 1.028A2.5 2.5 0 003.5 12.5h13a2.5 2.5 0 002.447-3.447l-1.028-1.028a.5.5 0 010-.707l1.028-1.028A2.5 2.5 0 0016.5 2.5h-13z" /></svg>;