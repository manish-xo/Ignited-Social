// import React from "react";

// const stale = () => {
//   return (
//     <section>
//       {/* Features */}
//       <div className="features mt-20 bg-subtle-bg mx-auto pt-16">
//         <div className="eyebrow flex items-center justify-center mb-3">
//           <CornerFrame className="bg-action-tint-bg">
//             <p className="font-mono uppercase text-xs tracking-widest">
//               Why it works
//             </p>
//           </CornerFrame>
//         </div>

//         <div>
//           <Heading className="text-center">Explains Features as</Heading>
//           <Heading className="text-center">Benefits</Heading>
//         </div>

//         <div>
//           <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
//             Both plans include a real human Growth Manager — the difference is
//             pace, depth, and the seniority of the person working on your
//             account.
//           </p>
//         </div>

//         <div className="mx-auto mt-16 pb-10 px-4 sm:px-0 grid max-w-4xl gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature, i) => {
//             const Icon = feature.icon;
//             return (
//               <div
//                 key={feature.title}
//                 className="group relative bg-white border border-secondary/30  rounded-xl px-4 relative transition-all duration-100 hover:bg-action-tint-bg hover:border-action-on-dark-border"
//               >
//                 <div className="px-1 grid grid-rows-4 grid-cols-1">
//                   {/* index row */}
//                   <div className="flex items-center justify-between">
//                     <span className="font-mono text-[0.688rem] tracking-[0.14em] text-muted">
//                       {String(i + 1).padStart(2, "0")} / {feature.tag}
//                     </span>
//                     <Icon
//                       size={18}
//                       className="text-muted transition-colors duration-300 group-hover:text-action"
//                     />
//                   </div>

//                   <h3 className="font-[700] tracking-tight leading-6 text-2xl text-ink">
//                     {feature.title}
//                   </h3>
//                   <p className="text-sm text-secondary font-[400] tracking-normal leading-relaxed">
//                     {feature.description}
//                   </p>

//                   {/* hairline footer with growth indicator */}
//                   <div className="flex items-center gap-2 border-t border-hairline pt-4">
//                     <span className="h-1.5 w-1.5 rounded-full bg-action transition-transform duration-300 group-hover:scale-125" />
//                     <span className="font-mono text-[10px] tracking-wide text-muted">
//                       ACTIVE
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       {/* Comparison */}
//       <div className="comparison bg-subtle-bg mx-auto pt-16 pb-10">
//         <div className="eyebrow flex items-center justify-center mb-3">
//           <CornerFrame className="bg-action-tint-bg">
//             <p className="font-mono uppercase text-xs">Weighing your options</p>
//           </CornerFrame>
//         </div>

//         <div className="heading">
//           <Heading className="text-center">
//             Comparison with other options
//           </Heading>
//         </div>

//         <div className="subHeading">
//           <p className="mx-auto mt-5 max-w-xs text-center text-sm leading-6 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
//             Four ways businesses try to grow — and the one that actually holds
//             up.
//           </p>
//         </div>

//         <div className="mx-auto px-4 md:px-0 mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
//           {/* left column */}
//           <div className="flex flex-col gap-6">{left.map(renderCard)}</div>

//           {/* center — recommended */}
//           <div className="md:row-span-1">{renderCard(center)}</div>

//           <div className="flex flex-col gap-6">{right.map(renderCard)}</div>
//         </div>

//         <div className="conclusion mt-10 mx-auto flex items-center justify-center">
//           <div className="px-6 py-4 inline-flex flex-col justify-center items-center border border-secondary border-dashed rounded-md bg-canvas">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-[700] tracking-tight space-x-1">
//               <span className="text-secondary">All the Expertise.</span>
//               <span className="text-ink">None of the Overhead</span>
//             </h2>

//             <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-6 font-[400] text-secondary tracking-tight sm:max-w-2xl sm:text-lg md:text-xl lg:text-[1.12rem]">
//               One person, doing the job of a full team — strategist, executor,
//               and marketer in one.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default stale;
