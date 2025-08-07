import React, { useState, useEffect } from 'react';
import type { Player, NPC, JobDefinition } from '../types';
import { getAvailableJobs, SKILLS_DATA, FREELANCE_GIGS } from '../gameLogic';
import { ActionButton, ProgressBar } from './ui';
import { ArrowLeftIcon, CrimeIcon, MindBodyIcon, EducationIcon, HeartPulseIcon, UniversityIcon, WorkHardIcon, QuitIcon, PromotionIcon, PartTimeJobsIcon, MilitaryIcon, SpecialCareersIcon, FreelanceGigsIcon, JobRecruiterIcon, BriefcaseIcon, SkillIcon, FreelanceIcon } from './Icons';


interface ActionModalProps {
    activeModal: string;
    onClose: () => void;
    onAction: (action: string, payload?: any) => void;
    player: Player;
}

const ModalHeader: React.FC<{ title: string; onBack?: () => void; onClose: () => void; player: Player }> = ({ title, onBack, onClose, player }) => (
    <div className="bg-blue-600 dark:bg-blue-800 p-3 text-white shadow-lg flex-shrink-0">
        <div className="flex justify-between items-center mb-3">
             <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-2xl">
                    {player.gender === 'مرد' ? '👨' : '👩‍'}
                </div>
                <div>
                    <div className="font-bold">{player.name}</div>
                    <div className="text-xs opacity-80">{player.job?.title || "بیکار"}</div>
                </div>
            </div>
            <div className="text-right">
                <div className="font-bold text-lg">${player.money.toLocaleString()}</div>
                <div className="text-xs opacity-80">موجودی حساب</div>
            </div>
        </div>
        <div className="bg-blue-700 dark:bg-blue-900 -mx-3 -mb-3 p-3 flex items-center">
            <button onClick={onBack || onClose} className="text-2xl font-bold p-2 -ml-2">
                 {onBack ? <ArrowLeftIcon /> : <span className="text-3xl">&times;</span>}
            </button>
            <h2 className="text-xl font-bold text-center flex-grow">{title.toUpperCase()}</h2>
        </div>
    </div>
);


const getModalTitle = (modal: string): string => {
    switch (modal) {
        case 'career': return 'حرفه';
        case 'current-job': return 'شغل فعلی';
        case 'full-time-jobs': return 'مشاغل تمام وقت';
        case 'part-time-jobs': return 'مشاغل پاره وقت';
        case 'education': return 'تحصیلات';
        case 'learn-skill': return 'دوره‌های مهارتی';
        case 'freelance-gigs': return 'کارهای فریلنسری';
        case 'military': return 'ارتش';
        case 'assets': return 'دارایی‌ها';
        case 'relationships': return 'روابط';
        case 'activities': return 'فعالیت‌ها';
        case 'mind-body': return 'ذهن و جسم';
        case 'crime': return 'جنایت';
        case 'npc-interaction': return 'تعامل';
        case 'coming-soon': return 'به زودی';
        default: return 'اقدامات';
    }
}

const MenuButton: React.FC<{icon: React.ReactNode, title: string, subtitle: string, onClick: () => void, disabled?: boolean}> = ({icon, title, subtitle, onClick, disabled}) => (
    <button onClick={onClick} disabled={disabled} className="w-full text-right p-3 flex items-center gap-4 border-b border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <div className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400">{icon}</div>
        <div>
            <div className="font-bold text-slate-800 dark:text-slate-100">{title}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</div>
        </div>
        <div className="ml-auto text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </div>
    </button>
);


const CareerMenu: React.FC<{player: Player; onNavigate: (view: string) => void}> = ({ player, onNavigate }) => {
    const navigateToComingSoon = () => onNavigate('coming-soon');
    
    return (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
             {player.job && (
                <MenuButton icon={<BriefcaseIcon />} title="شغل فعلی" subtitle={player.job.title} onClick={() => onNavigate('current-job')} />
             )}
             <MenuButton icon={<EducationIcon/>} title="تحصیلات" subtitle="به مدرسه یا دانشگاه برگرد" onClick={() => onNavigate('education')} />
             
             <MenuButton 
                icon={<FreelanceGigsIcon/>} 
                title="کارهای فریلنسری" 
                subtitle="کمی پول سریع بدست بیار" 
                onClick={() => onNavigate('freelance-gigs')} 
                disabled={player.age < 15}
             />
             <MenuButton 
                icon={<JobRecruiterIcon/>} 
                title="استخدام کننده" 
                subtitle="از استخدام کننده بازدید کن" 
                onClick={navigateToComingSoon} 
                disabled={player.age < 18}
             />
             <MenuButton 
                icon={<BriefcaseIcon/>} 
                title="مشاغل تمام وقت" 
                subtitle="لیست مشاغل تمام وقت" 
                onClick={() => onNavigate('full-time-jobs')} 
                disabled={player.age < 18}
            />
             <MenuButton 
                icon={<MilitaryIcon/>} 
                title="ارتش" 
                subtitle="به ارتش بپیوند" 
                onClick={() => onNavigate('military')} 
                disabled={player.age < 18}
             />
             <MenuButton 
                icon={<PartTimeJobsIcon/>} 
                title="مشاغل پاره وقت" 
                subtitle="لیست مشاغل ساعتی" 
                onClick={() => onNavigate('part-time-jobs')} 
                disabled={player.age < 12}
             />
             <MenuButton 
                icon={<SpecialCareersIcon/>} 
                title="مشاغل خاص" 
                subtitle="یک شغل خاص پیدا کن" 
                onClick={navigateToComingSoon} 
                disabled={player.age < 18}
             />
        </div>
    )
}

const JobView: React.FC<{player: Player; onAction: (action: string, payload?: any) => void;}> = ({ player, onAction }) => {
    if(!player.job) return null;
    return (
        <div className="p-4 space-y-3">
             <div className='bg-slate-50 dark:bg-slate-700 p-4 rounded-lg space-y-3'>
                 <p><strong>شرکت:</strong> {player.job.title} Inc.</p>
                 <p><strong>عنوان:</strong> {player.job.title}</p>
                 <p><strong>حقوق:</strong> ${player.job.salary.toLocaleString()}</p>
                 <p><strong>سابقه:</strong> {player.job.yearsInRole} سال</p>
                 <ProgressBar label="عملکرد" value={player.job.performance} icon={<WorkHardIcon/>}/>
            </div>
            <ActionButton onClick={() => onAction('workHarder')}><div className="flex items-center justify-center gap-2"><WorkHardIcon/> سخت کار کردن</div></ActionButton>
            <ActionButton onClick={() => onAction('askForPromotion')}><div className="flex items-center justify-center gap-2"><PromotionIcon/> درخواست ترفیع</div></ActionButton>
            <ActionButton onClick={() => onAction('quitJob')} className="!bg-red-500/80 hover:!bg-red-600/80 !border-red-300"><div className="flex items-center justify-center gap-2"><QuitIcon/> استعفا</div></ActionButton>
        </div>
    )
}

const JobListingView: React.FC<{player: Player; onAction: (a: string, p: any) => void; jobType: 'تمام وقت' | 'پاره وقت'}> = ({ player, onAction, jobType }) => {
    const jobs = getAvailableJobs(player, jobType);

    if (jobs.length === 0) {
        return <div className="p-4 text-center text-slate-400">در حال حاضر هیچ شغل {jobType} مناسبی برای شما وجود ندارد.</div>
    }

    return (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {jobs.map(job => (
                 <MenuButton 
                    key={job.id} 
                    icon={<BriefcaseIcon />} 
                    title={job.title} 
                    subtitle={`حقوق: $${job.baseSalary.toLocaleString()}`} 
                    onClick={() => onAction('applyForJob', {jobId: job.id})}
                 />
            ))}
        </div>
    );
}

const LearnSkillView: React.FC<{player: Player; onAction: (a: string, p: any) => void;}> = ({ player, onAction }) => {
    return (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {SKILLS_DATA.map(skill => (
                <div key={skill.id} className="p-3">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{skill.name}</span>
                        <span className="text-sm text-slate-400">سطح: {player.skills[skill.id] || 0}/100</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{skill.description}</p>
                    <ActionButton onClick={() => onAction('learnSkill', {skillId: skill.id})}>
                        شرکت در دوره (${skill.cost.toLocaleString()})
                    </ActionButton>
                </div>
            ))}
        </div>
    );
}

const FreelanceGigsView: React.FC<{player: Player; onAction: (a: string, p: any) => void;}> = ({ player, onAction }) => {
    return (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {FREELANCE_GIGS.map(gig => {
                const playerSkillLevel = player.skills[gig.requiredSkill] || 0;
                const canDo = playerSkillLevel >= gig.minLevel;
                return (
                     <MenuButton 
                        key={gig.id} 
                        icon={<FreelanceIcon />} 
                        title={gig.name} 
                        subtitle={`درآمد: $${gig.rewardRange[0]}-${gig.rewardRange[1]} | نیاز: ${gig.minLevel} ${gig.requiredSkill}`}
                        onClick={() => onAction('doFreelanceGig', {gigId: gig.id})}
                        disabled={!canDo}
                     />
                )
            })}
        </div>
    )
}

const MilitaryView: React.FC<{player: Player; onAction: (a: string) => void;}> = ({player, onAction}) => {
    return (
        <div className="p-4 space-y-4">
            <div className='bg-slate-50 dark:bg-slate-700 p-4 rounded-lg space-y-2'>
                <h3 className="font-bold text-lg">پیوستن به ارتش</h3>
                <p className="text-sm">با پیوستن به ارتش، به کشور خود خدمت کنید و از مزایای آن بهره‌مند شوید. این مسیر نیازمند نظم و آمادگی جسمانی بالاست.</p>
                 <ul className="text-sm list-disc list-inside pt-2">
                    <li>حداقل سن: ۱۸ سال</li>
                    <li>حداقل سلامتی: ۶۰</li>
                     <li>حداقل هوش: ۴۰</li>
                    <li>بدون سوء‌پیشینه</li>
                </ul>
            </div>
            <ActionButton onClick={() => onAction('joinMilitary')}>
                ثبت‌نام در ارتش
            </ActionButton>
        </div>
    );
};

const EducationView: React.FC<{player: Player; onAction: (a: string, p?: any) => void; onNavigate: (v: string) => void;}> = ({ player, onAction, onNavigate }) => {
    const isInSchool = ['دبستان', 'راهنمایی', 'دبیرستان'].includes(player.educationStatus.stage);
    const isInUniversity = player.educationStatus.stage === 'دانشگاه';
    const canEnrollUniversity = player.educationStatus.graduatedHighSchool && !player.educationStatus.graduatedUniversity && !isInUniversity;

    return (
        <div className="p-4 space-y-4">
            <div className='bg-slate-50 dark:bg-slate-700 p-4 rounded-lg space-y-2'>
                <p><strong>مقطع:</strong> {player.educationStatus.stage}</p>
                {(isInSchool || isInUniversity) && <p><strong>موسسه:</strong> {player.educationStatus.schoolName}</p>}
                {(isInSchool || isInUniversity) && (
                     <div className="pt-2">
                        <ProgressBar label="عملکرد" value={player.educationStatus.performance} icon={<EducationIcon />} />
                    </div>
                )}
            </div>
             <ActionButton onClick={() => onNavigate('learn-skill')}><div className="flex items-center justify-center gap-2"><SkillIcon/> شرکت در دوره‌های مهارتی</div></ActionButton>
            {(isInSchool || isInUniversity) && (
                 <ActionButton onClick={() => onAction('studyHarder')}>درس خواندن</ActionButton>
            )}
             {canEnrollUniversity && (
                 <ActionButton onClick={() => onAction('enrollInUniversity')}><div className="flex items-center justify-center gap-2"><UniversityIcon/> ثبت‌نام در دانشگاه</div></ActionButton>
            )}
            {(isInSchool || isInUniversity) && player.age >= 16 && (
                 <ActionButton onClick={() => onAction('dropOut')} className="!bg-red-500/80 hover:!bg-red-600/80 !border-red-300">ترک تحصیل / انصراف</ActionButton>
            )}
            {!isInSchool && !isInUniversity && !canEnrollUniversity && (
                 <p className="p-4 text-center text-slate-400">گزینه تحصیلی برای شما وجود ندارد.</p>
            )}
        </div>
    );
}

const RelationshipView: React.FC<{player: Player; onNpcClick: (npc: NPC) => void;}> = ({ player, onNpcClick }) => {
    if (player.relationships.length === 0) return <div className="p-4 text-center text-slate-400">هنوز با کسی آشنا نشده‌ای.</div>;
    return (
        <div className="p-2 space-y-2">
            {player.relationships.map(npc => (
                <button key={npc.id} onClick={() => onNpcClick(npc)} className="w-full flex items-center p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <div className='flex items-center gap-3 flex-grow'>
                        <span className="text-3xl">{npc.gender === 'مرد' ? '👨' : '👩‍'}</span>
                        <div>
                            <p className='font-bold text-right text-slate-800 dark:text-slate-100'>{npc.name}</p>
                            <p className='text-sm text-slate-500 dark:text-slate-400 text-right'>{npc.type}</p>
                        </div>
                    </div>
                    <div className='w-40'>
                        <ProgressBar label="رابطه" value={npc.relationship} icon={<HeartPulseIcon />} />
                    </div>
                </button>
            ))}
        </div>
    );
};

const NpcInteractionView: React.FC<{ npc: NPC; onAction: (a: string, p: any) => void; }> = ({ npc, onAction }) => {
    return (
         <div className="p-4 space-y-3">
            <ActionButton onClick={() => onAction('interactWithNpc', { npcId: npc.id, interactionType: 'compliment' })}>تعریف کردن</ActionButton>
            <ActionButton onClick={() => onAction('interactWithNpc', { npcId: npc.id, interactionType: 'spend_time' })}>وقت گذراندن</ActionButton>
         </div>
    );
}


export const ActionModal: React.FC<ActionModalProps> = ({ activeModal, onClose, onAction, player }) => {
    const [view, setView] = useState(activeModal);
    const [selectedNpc, setSelectedNpc] = useState<NPC | null>(null);

    // When the modal re-opens, reset its internal view to the root.
    useEffect(() => {
        setView(activeModal);
        setSelectedNpc(null);
    }, [activeModal]);

    const handleBack = () => {
        const historyMap: Record<string, string> = {
            'npc-interaction': 'relationships',
            'education': 'career',
            'full-time-jobs': 'career',
            'part-time-jobs': 'career',
            'current-job': 'career',
            'learn-skill': 'education',
            'freelance-gigs': 'career',
            'military': 'career',
            'mind-body': 'activities',
            'crime': 'activities',
            'coming-soon': 'career',
        };
        const prevView = historyMap[view];
        if (prevView) {
            setView(prevView);
        } else {
            onClose(); // Fallback if no history
        }
    }

    const renderContent = () => {
        switch (view) {
            case 'career':
                return <CareerMenu player={player} onNavigate={setView} />;
            case 'current-job':
                return <JobView player={player} onAction={onAction} />;
            case 'full-time-jobs':
                return <JobListingView player={player} onAction={onAction} jobType="تمام وقت" />;
            case 'part-time-jobs':
                return <JobListingView player={player} onAction={onAction} jobType="پاره وقت" />;
            case 'relationships':
                return <RelationshipView player={player} onNpcClick={(npc) => { setSelectedNpc(npc); setView('npc-interaction'); }} />;
            case 'npc-interaction':
                 return selectedNpc ? <NpcInteractionView npc={selectedNpc} onAction={onAction} /> : null;
            case 'activities':
                 return (
                    <div className="p-4 space-y-3">
                        <ActionButton onClick={() => setView('mind-body')}><div className="flex items-center justify-center gap-2"><MindBodyIcon /> <span>ذهن و جسم</span></div></ActionButton>
                        <ActionButton onClick={() => setView('crime')}><div className="flex items-center justify-center gap-2"><CrimeIcon /> <span>جنایت</span></div></ActionButton>
                    </div>
                );
            case 'education':
                return <EducationView player={player} onAction={onAction} onNavigate={setView} />;
            case 'learn-skill':
                return <LearnSkillView player={player} onAction={onAction} />;
            case 'freelance-gigs':
                return <FreelanceGigsView player={player} onAction={onAction} />;
            case 'military':
                return <MilitaryView player={player} onAction={onAction} />;
            case 'mind-body':
                 return (
                     <div className="p-4 space-y-3">
                         <ActionButton onClick={() => onAction('goToDoctor')}>مراجعه به پزشک</ActionButton>
                         <ActionButton onClick={() => onAction('meditate')}>مدیتیشن</ActionButton>
                     </div>
                 );
            case 'crime':
                 return (
                     <div className="p-4 space-y-3">
                        <ActionButton onClick={() => onAction('commitCrime')}>ارتکاب جرم</ActionButton>
                    </div>
                 );
             case 'assets':
                 return (
                      <div className="p-4 space-y-3">
                        <ActionButton onClick={() => onAction('buyHouse')}>خرید خانه</ActionButton>
                    </div>
                 );
            case 'coming-soon':
                 return (
                     <div className="p-4 text-center text-slate-400">این بخش در حال ساخت است.</div>
                 );
            default:
                return null;
        }
    }

    const showBackButton = view !== activeModal;

    return (
        <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col">
            <ModalHeader 
                title={getModalTitle(selectedNpc ? 'npc-interaction' : view)} 
                onClose={onClose}
                onBack={showBackButton ? handleBack : undefined}
                player={player}
            />
            <div className="overflow-y-auto flex-1">
                {renderContent()}
            </div>
        </div>
    );
};