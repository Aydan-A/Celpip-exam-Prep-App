// Writing — 2 official CELPIP tasks. Each task holds a bank of `writing` items.
// An item is laid out like the exam: `prompt` (the situation), `instruction`
// ("Write an email to … In your email:") and the `points` to cover; email
// items also carry a `type` (Complaint, Request, …); survey items carry a
// `title`, a `topic` and the two `options` (A, B). The task `filter` lists them.
// `sample` is a model response written to the CLB 10–12 standard (not an
// official CELPIP answer); `tips` and `sampleNotes` are task-specific.
export const writing = {
  id: 'writing',
  name: 'Writing',
  order: 2,
  official: { duration: '53–60 min', parts: 2, questions: 2 },
  criteria: [
    'Content/Coherence — number and quality of ideas, logical organization, and specific examples or details that support each point',
    'Vocabulary — a wide range of words and phrases, used precisely and naturally',
    'Readability — paragraphing and format, connectors and transitions, grammar and sentence variety, spelling and punctuation',
    'Task Fulfillment — relevance, completeness (every point answered), a tone that suits the reader, and a length of 150–200 words',
  ],
  tips: [
    'Plan first — spend 3–4 minutes deciding your main points and their order, and keep the last 3–4 minutes to proofread.',
    'One idea per paragraph — open each paragraph with a clear topic sentence.',
    'Support every point — add a specific reason, example, or consequence instead of a general statement.',
    'Vary your linking — use connectors such as however, as a result, in addition, and admittedly rather than repeating "and" and "but".',
    'Be precise — choose exact words ("considerable inconvenience", "unreliable") over vague ones ("very bad"), but only use words you are sure of.',
    'Mix sentence types — combine short sentences with longer ones built on because, although, which, and if.',
    'Aim for 170–200 words — too short loses Task Fulfillment; going far over wastes the time you need for checking.',
  ],
  tasks: [
    {
      id: 'write-email',
      name: 'Writing an Email',
      kind: 'writing',
      minutes: 27,
      wordMin: 150,
      wordMax: 200,
      instructions: 'Read the situation and write an email of about 150–200 words that covers every bullet point.',
      // Email purposes; every bank item has one `type`, used by the practice filter.
      filter: { key: 'type', label: 'Type', values: ['Complaint', 'Feedback', 'Request', 'Thank-you', 'Explanation', 'Inquiry', 'Suggestion', 'Update', 'Arrangements', 'Refund', 'Incident Report', 'Advice', 'Apology', 'Application', 'Cancellation', 'Congratulations', 'Declining', 'Follow-up', 'Invitation', 'Objection'] },
      tips: [
        'Read the task in three layers — the situation (who you are, where, when), the person you are writing to, and the bullet points under "In your email".',
        'The bullet points are your plan — answer every one, in the same order, with one body paragraph each. A missing or thin point costs Task Fulfillment.',
        'Let the reader set the tone — formal and polite for a manager, landlord, company, or coordinator; warm and relaxed for a friend or neighbour.',
        'Use the details the situation gives you (company, city, dates) and add realistic ones of your own — order numbers, times, amounts, and exactly how you were affected.',
        'Open with a greeting and a first sentence that says why you are writing; close with a polite final line and your name.',
        'When you ask for something, make it specific and reasonable — what you want, by when, and what happens next.',
        'Write with strong, precise vocabulary — a CLB 10–12 email uses collocations such as "express my dissatisfaction", "fall short of expectations", "at your earliest convenience", and varied structures ("Should the problem persist…", "Failing that…"). Only use words you can use accurately.',
        'Don\'t write from a memorised template — stock sentences that don\'t fit the situation weaken Content and Vocabulary. Build each email from its own bullet points.',
      ],
      sampleNotes: [
        'The first sentence states the purpose and reuses the details from the situation (company, city, date).',
        'Each bullet point has its own paragraph, in the same order as the task.',
        'Invented details (numbers, times, consequences) make every point concrete.',
        'The request is specific — what and by when — and the tone suits the reader throughout.',
        'Vocabulary is precise and formal ("regrettably", "stems primarily from", "a proportionate reduction in rent") and sentence structures are varied, without sounding forced.',
      ],
      bank: [
        {
          id: 'we-006',
          type: 'Complaint',
          prompt: 'You recently ordered groceries online from FreshMart Delivery in Toronto. Your order arrived on February 12, 2025, but there were several problems.',
          instruction: 'Write an email to the customer service manager. In your email:',
          points: [
            'Explain what you ordered and when',
            'Describe the problems with your delivery',
            'Say what you want the company to do',
          ],
          sample: `Dear Customer Service Manager,

I am writing to express my dissatisfaction with a grocery order delivered by FreshMart Delivery on February 12, 2025.

On February 10, I placed an online order (reference 40718) for my family's weekly groceries, which included dairy products, a dozen eggs, fresh salmon and an assortment of produce. Delivery was guaranteed for the morning of February 12.

Regrettably, the order arrived almost four hours behind schedule, and a considerable portion of it was unusable. Several eggs were cracked, the milk was lukewarm, suggesting it had not been refrigerated in transit, and the salmon was missing altogether, despite appearing on my invoice. Consequently, I had to make an unplanned trip to a supermarket that evening, which was both inconvenient and costly.

In light of this, I would request a full refund of $38.50 for the damaged and undelivered items. I would also urge you to review how perishable goods are handled, so that they reach customers in acceptable condition. Photographs of the damaged products and a copy of my receipt are attached for your reference.

I look forward to a prompt resolution.

Sincerely,
Daniel Reyes`,
        },
        {
          id: 'we-007',
          type: 'Request',
          prompt: 'You work at a technology company in Vancouver. You need to temporarily change your work schedule from night shifts to day shifts starting in August 2026.',
          instruction: 'Write an email to your HR manager. In your email:',
          points: [
            'Explain the reasons for your request',
            'Describe how this change could benefit your team',
            'Propose your new schedule',
          ],
          sample: `Dear Ms. Chen,

I am writing to request a temporary transfer from night shifts to day shifts, effective August 3, 2026.

My request stems primarily from family circumstances. My mother is scheduled to undergo surgery in late July and will require assistance at home in the evenings throughout her three-month recovery. Furthermore, I have enrolled in a part-time certificate program whose classes take place on weekday evenings, which would be impossible to reconcile with my current hours.

I am confident that this arrangement would also benefit the team. Working during the day would allow me to take part in sprint planning and collaborate directly with the developers I support, rather than relying on handover notes, which occasionally lead to miscommunication. Moreover, Kevin Park from the day team has expressed interest in gaining night-shift experience, so coverage would remain uninterrupted.

Accordingly, I propose working Monday to Friday, from 8 a.m. to 4 p.m., until October 31, at which point we could reassess the arrangement.

Thank you for considering my request. I would be glad to discuss it at your earliest convenience.

Kind regards,
Arash Karimi`,
        },
        {
          id: 'we-008',
          type: 'Complaint',
          prompt: 'You rent an apartment in Calgary. The heating system has not been working properly since early January 2026, and previous requests have not been addressed.',
          instruction: 'Write an email to your landlord. In your email:',
          points: [
            'Describe the heating problem in detail',
            'Explain how this affects your daily life',
            'Suggest what your landlord should do and by when',
          ],
          sample: `Dear Mr. Wilson,

I am writing once again regarding the heating in unit 304, which has been malfunctioning since early January 2026, despite my repeated requests for repairs.

Although the radiators switch on, they emit barely any heat, and the temperature in the bedroom and living room seldom exceeds 15 degrees, even with the thermostat set to 22. On particularly cold nights, the system shuts down entirely for several hours. I reported the issue on January 8 and again on January 20, yet no one has come to inspect it.

This situation has significantly disrupted my daily life. Since I work from home, I have been forced to wear a winter coat at my desk and to purchase two space heaters, which have driven up my electricity bill substantially. Moreover, my young son has fallen ill twice this month.

I therefore request that you arrange for a licensed technician to repair the system no later than February 6. Should the problem persist beyond that date, I would expect a proportionate reduction in rent as well as reimbursement for the heaters.

I look forward to your prompt response.

Sincerely,
Olivia Martin`,
        },
        {
          id: 'we-009',
          type: 'Feedback',
          prompt: 'You enrolled in an online CELPIP preparation course with a language institute that started in October 2025. The course did not meet your expectations.',
          instruction: 'Write an email to the course coordinator. In your email:',
          points: [
            'Explain what you expected from the course',
            'Describe what went wrong',
            'State what improvements or compensation you would like',
          ],
          sample: `Dear Course Coordinator,

I am writing to raise my concerns about the online CELPIP preparation course I enrolled in at your institute, which commenced in October 2025.

When I registered, I anticipated that the course would deliver what your website advertised: two live classes per week, practice tests under authentic exam conditions, and individualized feedback on my writing and speaking. As I require CLB 9 for my permanent residence application, these features were the decisive factor in my choice.

Unfortunately, the course has fallen considerably short of these expectations. Several live sessions were cancelled at extremely short notice, and many of the remaining ones were replaced with pre-recorded videos. Moreover, only two of the six writing tasks I submitted received feedback, and even those comments were superficial. To date, we have not completed a single full-length practice test.

I would therefore ask the institute to provide detailed feedback on my outstanding assignments and to schedule at least two complete mock tests before my exam in March. Failing that, I believe a refund of half the tuition would be fair compensation.

I look forward to your reply.

Sincerely,
Maria Lopez`,
        },
        {
          id: 'we-010',
          type: 'Suggestion',
          prompt: 'Your city\'s community centre is looking for ideas for events. You want to suggest organizing a multicultural food festival in September 2026.',
          instruction: 'Write an email to the community centre manager. In your email:',
          points: [
            'Describe your idea for the event',
            'Explain how this would benefit local residents',
            'Suggest how the event could be organized and promoted',
          ],
          sample: `Dear Ms. Patel,

In response to your recent call for event ideas, I would like to propose a multicultural food festival at the community centre in September 2026.

I envision a one-day celebration on a Saturday, featuring food stalls run by local families and restaurants that showcase the remarkable diversity of our neighbourhood. To complement the cuisine, the program could include live music, traditional dance performances, and a hands-on cooking workshop for children.

Such an event would benefit residents in several meaningful ways. Above all, it would foster a stronger sense of community by bringing together neighbours who seldom interact, particularly newcomers who may feel isolated. It would also give small local businesses valuable exposure and offer families an affordable outing before the hectic school year begins.

As for organization, the centre could establish a volunteer committee in the spring and invite vendors to apply by June. To publicize the festival, we could distribute posters to local shops and schools, promote it through the centre's social media channels, and request a feature in the community newsletter.

I would be delighted to serve on the planning committee. Thank you for considering my proposal.

Best regards,
Hannah Kim`,
        },
        {
          id: 'we-011',
          type: 'Thank-you',
          prompt: 'While you were visiting family in another province for three weeks in March 2026, your neighbour looked after your house and your dog.',
          instruction: 'Write an email to your neighbour. In your email:',
          points: [
            'Thank them for what they did',
            'Explain how their help made a difference to you',
            'Offer something in return',
          ],
          sample: `Dear Linda,

I just wanted to send you a proper thank-you for looking after the house and Milo while I was visiting my family in Nova Scotia in March.

I honestly don't know what I would have done without you. You went far beyond feeding and walking Milo twice a day: you brought in the mail, watered my plants, and even shovelled the front steps after that unexpected snowstorm. When the furnace started making strange noises, you called the repair company right away, which probably spared me a very expensive breakdown.

Knowing that everything at home was in such capable hands allowed me to focus entirely on my father, who was recovering from surgery. Coming back to a contented dog and a spotless house was the perfect end to a stressful few weeks.

I would love to return the favour. Please let me treat you and Tom to dinner at that new Italian restaurant on King Street next weekend. And whenever you go away this summer, I would be more than happy to look after your garden and your cat.

Thank you again for your kindness.

Warm regards,
Sophie`,
        },
        {
          id: 'we-012',
          type: 'Explanation',
          prompt: 'You missed an important team meeting at your company in Ottawa on May 14, 2026. Your manager has asked you why you were absent.',
          instruction: 'Write an email to your manager. In your email:',
          points: [
            'Explain why you missed the meeting',
            'Describe what you have done to catch up',
            'Suggest how a similar problem could be avoided in the future',
          ],
          sample: `Dear Mr. Thompson,

I am writing to explain my absence from the quarterly planning meeting on May 14, 2026, and to apologize for any inconvenience it caused.

On the morning of the meeting, my daughter's school called to inform me that she had fallen during recess and needed to be taken to hospital. As her emergency contact, I had to leave immediately, and in the rush I neglected to notify you or the team. Fortunately, her injury turned out to be minor.

Since then, I have taken steps to catch up. I have reviewed the minutes and presentation slides, met with Aisha to go over the new budget targets, and submitted the revised timeline for my projects, which was due on Friday.

To prevent a similar situation, I have saved the team's contact list on my phone so that I can alert someone within minutes in an emergency. I would also suggest recording future planning meetings, which would allow anyone who is unavoidably absent to stay fully informed.

Thank you for your understanding.

Sincerely,
Jason Wu`,
        },
        {
          id: 'we-013',
          type: 'Inquiry',
          prompt: 'You saw an advertisement for a part-time Business Administration program at a community college in Winnipeg, starting in January 2027.',
          instruction: 'Write an email to the college admissions office. In your email:',
          points: [
            'Introduce yourself and explain why you are interested in the program',
            'Ask about the class schedule and format',
            'Ask about fees and financial support',
          ],
          sample: `Dear Admissions Office,

I am writing to enquire about the part-time Business Administration program advertised on your website, which begins in January 2027.

I moved to Winnipeg two years ago and currently work as a sales associate at a furniture retailer. Although I hold a bachelor's degree in economics from my home country, I would like to acquire a Canadian credential that would enable me to move into a management role. Your program appeals to me particularly because of its focus on small-business operations.

Since I work full-time, I would appreciate further details about the schedule. Specifically, are classes held exclusively in the evenings, or are some courses offered on weekends or online? I would also like to know whether exams must be written in person.

Finally, could you clarify the total tuition and whether it can be paid in instalments? I would also be grateful for information about any bursaries available to part-time students, and whether my previous degree might exempt me from introductory courses.

Thank you in advance for your assistance.

Yours sincerely,
Elena Popescu`,
        },
        {
          id: 'we-014',
          type: 'Update',
          prompt: 'You are coordinating the renovation of the staff lounge at your office in Halifax. The work was supposed to be finished in April 2026, but it has been delayed.',
          instruction: 'Write an email to all staff. In your email:',
          points: [
            'Describe the progress made so far',
            'Explain the reasons for the delay',
            'Give the new timeline and explain what staff should expect',
          ],
          sample: `Dear Colleagues,

I am writing to update you on the renovation of the third-floor staff lounge, which was originally scheduled for completion in April 2026.

So far, considerable progress has been made. The old flooring and cabinets have been removed, the new lighting has been installed, and the walls have been repainted in the colours most of you voted for in February.

Unfortunately, the project has been delayed for two reasons. First, our supplier informed us that the custom counters would arrive five weeks late owing to a manufacturing backlog. Second, the building inspector identified outdated wiring behind the sink, which must be replaced before any appliances can be safely connected.

As a result, we now expect the lounge to reopen on May 29. In the meantime, the temporary break area in Meeting Room B, complete with a microwave and coffee machine, will remain available. Please be aware that there may be occasional drilling on the third floor between 7 and 9 a.m. while the electricians complete their work.

Thank you for your patience. Please feel free to contact me with any questions.

Best regards,
Nadia Hussain
Facilities Coordinator`,
        },
        {
          id: 'we-015',
          type: 'Arrangements',
          prompt: 'Three colleagues from your company\'s overseas office are coming to Edmonton for a week of training in June 2026. You are responsible for organizing their visit.',
          instruction: 'Write an email to the visiting colleagues. In your email:',
          points: [
            'Describe the accommodation and transportation arrangements',
            'Outline the schedule for the week',
            'Tell them what they need to prepare or bring',
          ],
          sample: `Dear Carlos, Mei and Rahul,

I am delighted that you will be joining us in Edmonton for the training week from June 8 to 12, 2026, and I would like to outline the arrangements for your visit.

You will be staying at the Riverside Suites, a ten-minute walk from our office, with breakfast included. A driver will meet you in the arrivals hall at Edmonton International Airport on Sunday evening, so there is no need to arrange a taxi.

Training will run from 9 a.m. to 4 p.m. each day. Monday and Tuesday will focus on our new client database, Wednesday will be devoted to workshops with the sales team, and on Thursday we will tour our distribution centre. On Friday evening, we have organized a farewell dinner downtown.

Before you travel, please install the latest version of the software on your laptops and complete the short online module I sent last week. Since June evenings can be surprisingly cool here, I would also recommend packing a light jacket.

I look forward to welcoming you.

Best regards,
Emily Laurent`,
        },
        {
          id: 'we-016',
          type: 'Refund',
          prompt: 'In January 2026, you paid for a one-year membership at a fitness centre in Mississauga. You now have to move to another province for work.',
          instruction: 'Write an email to the fitness centre. In your email:',
          points: [
            'Give the details of your membership',
            'Explain why you need to cancel it',
            'Say how much money you expect back and how it should be paid',
          ],
          sample: `Dear Membership Services,

I am writing to request a partial refund of my annual membership at your Mississauga location (membership number 22817), which I purchased on January 5, 2026, for $780.

Regrettably, I have been transferred to my company's head office in Halifax and will be relocating at the end of this month. Since your club has no branches in Nova Scotia, I will be unable to use my membership for the remaining eight months. I have attached a copy of my transfer letter as proof of relocation.

According to your terms, members who move more than 50 kilometres away are entitled to a prorated refund. Based on the eight unused months, I believe I am owed $520, less the $50 administration fee specified in the contract, for a total of $470.

I would be grateful if this amount could be credited to the card I used for the original payment within the next two weeks. Please let me know if you require any further documentation.

Thank you for your assistance.

Sincerely,
Kwame Asante`,
        },
        {
          id: 'we-017',
          type: 'Incident Report',
          prompt: 'You are a shift supervisor at a warehouse in Surrey. Yesterday afternoon, an accident involving a forklift happened in your area.',
          instruction: 'Write an email to the company\'s safety manager. In your email:',
          points: [
            'Describe what happened',
            'Explain what actions were taken immediately',
            'Recommend steps to prevent similar incidents',
          ],
          sample: `Dear Ms. Grant,

I am writing to report an incident that occurred in Aisle 7 of the Surrey warehouse at approximately 2:40 p.m. yesterday, during the afternoon shift.

While reversing with a full pallet, a forklift operator collided with a storage rack. The impact dislodged several boxes of ceramic tiles from the upper shelf, one of which struck a picker, Daniel Ortiz, on the shoulder. The operator later explained that his view had been obstructed by the load and that the reversing alarm was not functioning.

Immediately afterwards, I halted all work in the area, and our first-aid attendant examined Daniel before he was taken to hospital as a precaution. Fortunately, he suffered only bruising and was discharged that evening. The forklift was taken out of service, the aisle was cordoned off, and the rack was inspected for structural damage.

To prevent a recurrence, I would recommend daily pre-shift checks of all forklift alarms, a lower stacking limit in narrow aisles, and a refresher safety course for every operator.

Please let me know if you require witness statements.

Regards,
Tariq Mahmood
Shift Supervisor`,
        },
        {
          id: 'we-018',
          type: 'Advice',
          prompt: 'Your cousin will move to Montreal next fall to study at a university. They have asked you for advice about living in Canada.',
          instruction: 'Write an email to your cousin. In your email:',
          points: [
            'Give advice about finding a place to live',
            'Give advice about managing money',
            'Suggest ways to adjust to life in Canada',
          ],
          sample: `Hi Ali,

It's fantastic news that you've been accepted to McGill! Since you asked for advice about settling in, here are a few things I wish someone had told me.

When it comes to housing, I'd recommend living in residence for your first year. It's pricier than sharing an apartment, but it takes a huge weight off your shoulders, and you'll make friends straight away. If you look for an apartment later, never send a deposit before seeing the place, because rental scams are surprisingly common.

As for money, open a student bank account as soon as you arrive, since most have no monthly fees. Draw up a realistic budget, and don't underestimate how much groceries cost here. A part-time job on campus is a great way to earn extra income without a long commute.

Finally, don't let the winter catch you off guard. Invest in a proper coat and waterproof boots, and try skating or skiing rather than hibernating indoors. Joining a student club will also help you feel at home much faster.

Call me anytime if you need anything!

Take care,
Farid`,
        },
        {
          id: 'we-019',
          type: 'Apology',
          prompt: 'You borrowed a friend\'s camera for a trip to the Rocky Mountains in August 2026 and accidentally damaged it.',
          instruction: 'Write an email to your friend. In your email:',
          points: [
            'Apologize and explain what happened',
            'Describe the damage',
            'Explain how you will make up for it',
          ],
          sample: `Hi Jenna,

I'm afraid I have some bad news, and I feel terrible about it. Your camera was damaged during my trip to the Rockies, and I owe you a sincere apology.

On our last day in Jasper, I was taking photos at Maligne Canyon when I slipped on a wet rock. I managed to regain my balance, but the camera struck the railing before I could stop it. I should have kept it in its case on such a slippery trail, and I take full responsibility for my carelessness.

The body seems fine and it still turns on, but the lens is cracked and the autofocus no longer works properly. I took it to a camera shop in Calgary yesterday, and the technician confirmed that the lens would have to be replaced.

Needless to say, I'll cover the full cost. The shop quoted $450 for a new lens, and I'm happy to order it this week, or, if you'd prefer, I can transfer the money so you can choose one yourself. Please also let me take you out for dinner as a small way of making it up to you.

Again, I'm truly sorry.

Love,
Maya`,
        },
        {
          id: 'we-020',
          type: 'Application',
          prompt: 'You saw an advertisement for a Volunteer Coordinator position at a food bank in Saskatoon.',
          instruction: 'Write an email to the hiring manager. In your email:',
          points: [
            'Explain why you are interested in the position',
            'Describe your relevant experience and skills',
            'Say when you are available to start and to attend an interview',
          ],
          sample: `Dear Ms. Bouchard,

I am writing to apply for the Volunteer Coordinator position at the Saskatoon Community Food Bank, which I saw advertised on your website last week.

Your organization's commitment to tackling food insecurity resonates with me deeply. When my family first arrived in Canada, we relied on a food bank for several months, and I have wanted to give back to such a service ever since.

I believe my experience makes me well suited to the role. For the past three years, I have worked as an assistant manager at a grocery store, where I schedule a team of twenty employees, train new staff, and oversee inventory. In addition, I have volunteered at a local shelter every weekend for two years and recently organized a winter clothing drive that attracted more than sixty volunteers. I am also fluent in English, French and Arabic.

I would be available to start on September 1, 2026, and could attend an interview at any time next week, either in person or online. My résumé is attached for your consideration.

Thank you for your time.

Sincerely,
Omar Haddad`,
        },
        {
          id: 'we-021',
          type: 'Cancellation',
          prompt: 'You booked a banquet hall in Brampton for your parents\' 30th wedding anniversary party on October 17, 2026. You now need to cancel the booking.',
          instruction: 'Write an email to the banquet hall\'s event coordinator. In your email:',
          points: [
            'Give the details of your booking',
            'Explain why you must cancel',
            'Ask about your deposit and the possibility of choosing a later date',
          ],
          sample: `Dear Event Coordinator,

I am writing to cancel my booking of the Grand Ballroom for October 17, 2026 (reference GB-3391), which I reserved in March for my parents' 30th wedding anniversary celebration.

Unfortunately, my father has recently been diagnosed with a heart condition, and his doctor has advised him to avoid large gatherings for the next few months while he undergoes treatment. After much discussion, our family has concluded that postponing the celebration is the only responsible option.

I realize that cancellations made less than three months in advance may incur a fee, and I would appreciate confirmation of how much of my $1,500 deposit will be refunded. Given the medical circumstances, I would be grateful if you could consider waiving the penalty; I can provide a doctor's note if required.

Alternatively, I would be happy to transfer the deposit to a new date instead of receiving a refund. If the ballroom is available on a Saturday in May or June 2027, please let me know which dates are open.

Thank you for your understanding.

Kind regards,
Priya Nair`,
        },
        {
          id: 'we-022',
          type: 'Congratulations',
          prompt: 'A former coworker of yours has just been promoted to Regional Director at a bank in Toronto.',
          instruction: 'Write an email to your former coworker. In your email:',
          points: [
            'Congratulate them on the promotion',
            'Describe the qualities that make them suitable for the role',
            'Suggest a way to celebrate together',
          ],
          sample: `Dear Monica,

I was thrilled to hear from Kevin that you have been promoted to Regional Director. Congratulations! It is a thoroughly well-deserved achievement, and I could not be happier for you.

Having worked alongside you for five years, I can think of no one better suited to the role. You always had a remarkable ability to stay composed under pressure, and your sound judgment during the branch merger in 2022 spared us countless mistakes. More importantly, you never hesitated to mentor junior staff like me, and much of what I know about handling clients I learned from you. I am certain your new team will benefit enormously from your leadership.

We simply must celebrate properly. Would you be free for dinner at our old favourite spot on Queen Street sometime next week? Thursday or Friday evening would suit me perfectly, and it would be lovely to catch up on everything that has happened since I left.

Once again, congratulations on this wonderful milestone. I look forward to hearing all about your new position.

Warmest wishes,
Grace`,
        },
        {
          id: 'we-023',
          type: 'Declining',
          prompt: 'Your manager has offered you the chance to lead a new project team starting in November 2026. The job would require frequent travel between Vancouver and Seattle for six months. You have decided not to accept.',
          instruction: 'Write an email to your manager. In your email:',
          points: [
            'Thank your manager for the offer',
            'Explain why you must decline',
            'Suggest another way you could contribute to the project',
          ],
          sample: `Dear Ms. Alvarez,

Thank you very much for offering me the opportunity to lead the new cross-border integration team starting in November 2026. I am genuinely honoured that you considered me for such an important role.

After careful consideration, however, I regret that I must decline. The position would require me to spend several days a week in Seattle over the six-month period, and my family circumstances make that impossible at present. My wife is expecting our second child in December, and I need to be at home during the months surrounding the birth.

That said, I remain eager to contribute to the project's success. I would be glad to serve as the Vancouver-based point of contact, overseeing the database migration and supporting the team remotely. I would also like to recommend Daniel Kim for the leadership role; he has extensive experience with the Seattle office and has expressed interest in taking on greater responsibility.

I hope you will understand my decision, and I would welcome the chance to discuss other ways I can support the initiative.

Kind regards,
Ahmed Rahimi`,
        },
        {
          id: 'we-024',
          type: 'Follow-up',
          prompt: 'Two weeks ago, you had a job interview for a marketing position at a company in Victoria. You have not heard back yet.',
          instruction: 'Write an email to the person who interviewed you. In your email:',
          points: [
            'Thank them for the interview',
            'Add information you forgot to mention',
            'Ask about the next steps and the timeline',
          ],
          sample: `Dear Mr. Novak,

I am writing to follow up on my interview for the Marketing Coordinator position at Coastline Outfitters, which took place on September 3 at your Victoria office.

I would like to thank you and Ms. Reid once again for taking the time to meet with me. I particularly enjoyed learning about your plans to expand the company's online presence, and our conversation only strengthened my enthusiasm for the role.

There is one point I neglected to mention during the interview. When you asked about social media campaigns, I described my work for my previous employer, but I did not mention that I independently managed a local bakery's Instagram account last year, increasing its following from 800 to over 6,000 in eight months. I believe this experience is directly relevant to the growth strategy you outlined.

As you indicated that a decision would be made within ten days, I wanted to enquire whether there has been any progress. Could you let me know the expected timeline, or whether you require any further information from me?

Thank you for your consideration.

Sincerely,
Lucas Ferreira`,
        },
        {
          id: 'we-025',
          type: 'Invitation',
          prompt: 'A colleague is retiring after 25 years at your company in Kitchener, and you are organizing a farewell party in June 2026.',
          instruction: 'Write an email to your coworkers. In your email:',
          points: [
            'Explain the purpose of the event',
            'Give the date, time, location and other details',
            'Ask them to do something before the party',
          ],
          sample: `Dear Colleagues,

After an extraordinary 25 years with our company, Margaret Leung will be retiring at the end of June, and I would like to invite you all to a farewell party in her honour.

As most of you know, Margaret has been the backbone of our accounting department. She trained many of us when we first joined, and her generosity and dry sense of humour have made this office a far better place. This celebration is our chance to show how much she has meant to us.

The party will take place on Friday, June 26, from 4:30 to 7:00 p.m. in the rooftop lounge of our Kitchener office. A buffet and refreshments will be provided, followed by a short slideshow of photos from Margaret's career. Please keep it under wraps, as it will be a surprise.

I would kindly ask you to confirm your attendance by June 19 so that we can finalize the catering. If you wish to contribute to a group gift, envelopes are available at reception, and we would welcome any photos or messages for a memory book.

I hope to see you all there.

Best wishes,
Rebecca Stone`,
        },
        {
          id: 'we-026',
          type: 'Objection',
          prompt: 'Your city has announced a plan to close the public library branch in your Hamilton neighbourhood in January 2027 to save money.',
          instruction: 'Write an email to your city councillor. In your email:',
          points: [
            'Explain why you oppose the decision',
            'Describe how residents would be affected',
            'Propose an alternative to closing the branch',
          ],
          sample: `Dear Councillor Martin,

I am writing to voice my strong objection to the city's proposal to close the Westdale branch of the Hamilton Public Library in January 2027 as a cost-saving measure.

Although I appreciate the pressure on the municipal budget, I believe this decision is short-sighted. The branch is far more than a place to borrow books; it provides free internet access, homework clubs, and English conversation circles that cannot easily be replaced. Moreover, the projected savings represent only a tiny fraction of the city's annual spending.

The closure would disproportionately affect the most vulnerable residents. Many seniors in our neighbourhood do not drive, and the nearest remaining branch is a forty-minute bus ride away. Likewise, low-income families and newcomers, who rely on the library's computers to apply for jobs and government services, would effectively lose access altogether.

Rather than closing the branch, I would urge the council to consider reducing its opening hours on weekday mornings, when attendance is lowest, or sharing the building with a community organization willing to contribute to the rent.

I would appreciate your support on this matter.

Sincerely,
Helen Carter`,
        },
      ],
    },
    {
      id: 'write-survey',
      name: 'Responding to Survey Questions',
      kind: 'writing',
      minutes: 26,
      wordMin: 150,
      wordMax: 200,
      instructions: 'Read the survey, choose option A or B, and write about 150–200 words explaining your choice.',
      itemInstruction: 'Choose between options A and B. Why do you prefer your option? Explain the reasons for your choice, and write about 150–200 words.',
      // Survey subjects; every bank item has one `topic`, used by the practice filter.
      filter: { key: 'topic', label: 'Topic', values: ['Community & Services', 'Environment & Nature', 'Education & Learning', 'Family & Friends', 'Food & Dining', 'Health & Wellness', 'Home & Housing', 'Leisure & Culture', 'Money & Shopping', 'Technology & Online', 'Travel & Transport', 'Work & Career'] },
      tips: [
        'Use a flexible 4-paragraph plan — it saves time and reduces stress within the 26 minutes. Adapt it to each survey\'s situation instead of memorising whole sentences.',
        'Paragraph 1 (Introduction) — paraphrase the question and state your clear choice, e.g. "I strongly believe that Option A is the preferable choice for our community." Never sit on the fence.',
        'Paragraph 2 (First reason) — present your strongest reason with a supporting example or explanation.',
        'Paragraph 3 (Second reason) — add another compelling reason with evidence — a result, a figure, or a real-life situation. If space allows, briefly admit a strength of the other option and show why yours is still better.',
        'Paragraph 4 (Conclusion) — summarize the benefits and restate your opinion, keeping a polite, respectful tone toward the decision-makers.',
        'Link your ideas with transitions such as "firstly", "in addition", "as a result", "furthermore" and "on the other hand" — but don\'t overuse them or open every sentence with one.',
        'Pick the option you can argue best; it does not have to be your real opinion.',
        'Argue with strong, precise vocabulary — "markedly enhance", "cater to a broader cross-section", "a viable alternative", "alleviate congestion" — and vary your structures ("Were travel times to improve…", "not to mention…"). Only use words you can use accurately.',
      ],
      sampleNotes: [
        'The choice is stated in the first sentence and never wavers.',
        'Each body paragraph develops one reason with a concrete example or consequence.',
        'The other option is acknowledged fairly, then answered (concession + rebuttal).',
        'A one-sentence conclusion restates the choice without repeating whole phrases.',
        'Vocabulary is precise and persuasive ("mitigate", "reap the rewards", "chronic delays") and sentence structures are varied, without sounding forced.',
      ],
      bank: [
        {
          id: 'ws-001',
          topic: 'Environment & Nature',
          title: 'Downtown Parking Lot',
          prompt: 'Your city is deciding what to do with a downtown parking lot and has asked residents for their opinion.',
          options: [
            'Replace the parking lot with a community garden, creating green space for residents to grow food and relax.',
            'Keep the lot as parking, preserving much-needed spaces for drivers who work and shop downtown.',
          ],
          sampleChoice: 0,
          sample: `I strongly favour Option A: converting the downtown parking lot into a community garden.

First and foremost, a garden would markedly enhance the quality of life in the city centre. At present, the area is dominated by concrete and heavy traffic, and residents have few green spaces in which to unwind. A well-maintained garden would provide families, seniors and office workers with a tranquil retreat, while also mitigating the heat that accumulates on paved surfaces during the summer months.

Moreover, a garden would strengthen community ties. Neighbours who might otherwise never cross paths would work side by side, exchange fresh produce and organize seasonal events, fostering a sense of belonging that is notoriously difficult to cultivate in a busy urban setting.

Admittedly, opponents may argue that downtown parking is already scarce. However, several multi-storey garages are within walking distance, and reducing parking would, in fact, encourage greater use of public transit, thereby easing congestion and cutting emissions.

For these reasons, I am convinced that a community garden represents a far more valuable use of this prime location.`,
        },
        {
          id: 'ws-002',
          topic: 'Community & Services',
          title: 'City Budget Project',
          prompt: 'Your city council has a new budget and can fund only one project for residents.',
          options: [
            'Build a public swimming pool, offering swimming lessons and a place to cool off in summer.',
            'Build a community sports complex with a gymnasium, indoor courts, and a fitness centre.',
          ],
          sampleChoice: 1,
          sample: `In my view, the city council should allocate the budget to Option B, a community sports complex.

The most compelling reason is that a sports complex would cater to a far broader cross-section of residents. Whereas a swimming pool appeals primarily to swimmers, a facility equipped with a gymnasium, indoor courts and a fitness centre could accommodate basketball, volleyball, badminton and yoga, among many other activities. Consequently, people of all ages and interests would reap the rewards of this investment.

Furthermore, an indoor complex would remain usable year-round, regardless of the weather. Given our long, harsh winters, which severely restrict outdoor recreation, such a facility would encourage residents to stay active even in the depths of January. It could also generate revenue by hosting regional tournaments and school events, helping to offset maintenance costs.

I acknowledge that a pool offers distinct advantages, notably lessons that teach children essential water-safety skills. Nevertheless, many modern complexes incorporate a small pool, so the city need not sacrifice this benefit entirely.

Ultimately, a sports complex would deliver the greatest value for taxpayers' money.`,
        },
        {
          id: 'ws-003',
          topic: 'Travel & Transport',
          title: 'Public Transit Improvement',
          prompt: 'Your city can improve public transit in only one way this year and is asking commuters for their views.',
          options: [
            'Add more bus-only lanes, so that buses can move faster during rush hour.',
            'Reduce bus fares by 10%, making public transit more affordable for daily commuters.',
          ],
          sampleChoice: 0,
          sample: `I firmly believe that expanding bus-only lanes (Option A) would benefit commuters far more than a 10% fare reduction.

The fundamental problem with our transit system is not affordability but reliability. During rush hour, buses are trapped in the same gridlock as private vehicles, so a journey that should take twenty minutes frequently stretches to forty-five. Dedicated lanes would enable buses to bypass congestion, allowing commuters to arrive punctually and plan their days with confidence.

Furthermore, faster service would attract new riders. Many residents currently drive simply because buses are too slow to be a viable alternative. Were travel times to improve noticeably, a significant proportion of these drivers would switch to public transit, which would, in turn, alleviate traffic and reduce pollution citywide.

By contrast, a 10% fare cut would save the average commuter only a few dollars a week. While undoubtedly welcome, this modest saving would do nothing to address the chronic delays that frustrate riders on a daily basis.

For these reasons, investing in bus lanes is unquestionably the more effective option.`,
        },
        {
          id: 'ws-004',
          topic: 'Work & Career',
          title: 'New Employee Benefit',
          prompt: 'Your employer will introduce one new benefit for staff and has asked employees to vote.',
          options: [
            'Offer flexible working hours, allowing staff to choose when they start and finish their day.',
            'Provide free professional training, helping employees develop new skills for their careers.',
          ],
          sampleChoice: 0,
          sample: `If my employer can introduce only one new benefit, I would unhesitatingly choose Option A, flexible working hours.

The primary reason is that flexibility would substantially improve employees' work-life balance. Many of my colleagues are raising young children or caring for elderly parents, and a rigid nine-to-five schedule makes it extremely challenging to juggle medical appointments and school pick-ups. The freedom to start earlier or finish later would alleviate a great deal of this pressure.

In addition, flexible hours would likely boost productivity. Some people concentrate best early in the morning, whereas others are at their most focused in the afternoon. Allowing staff to work during their peak hours would benefit the company as much as the individual, not to mention sparing employees the stress of rush-hour commuting.

Admittedly, free professional training is valuable and can accelerate career advancement. However, a wide range of affordable courses is readily available online, and motivated employees can pursue them independently. Flexible scheduling, by contrast, is something only an employer can provide.

Therefore, I am convinced that flexible hours would yield the greatest benefit for staff and the company alike.`,
        },
        {
          id: 'ws-005',
          topic: 'Work & Career',
          title: 'Company Relocation',
          prompt: 'A company is considering moving its headquarters to a new location to improve its business prospects. The leadership team has narrowed it down to two potential cities.',
          options: [
            'Move to a larger city with more business opportunities, better infrastructure, and access to a larger talent pool.',
            'Stay in the current, smaller city where the cost of living is lower, employee satisfaction is high, and the company has established community ties.',
          ],
        },
        {
          id: 'ws-006',
          topic: 'Work & Career',
          title: 'Employee Training Program',
          prompt: 'A company is planning to invest in a new training program to enhance employee skills and productivity. The management team has to decide between two different approaches.',
          options: [
            'Develop online courses that employees can complete at their own pace, offering flexibility and convenience.',
            'Organize in-person workshops led by expert trainers, providing hands-on experience and immediate feedback.',
          ],
        },
        {
          id: 'ws-007',
          topic: 'Money & Shopping',
          title: 'Marketing Strategy',
          prompt: 'A business is planning a new marketing campaign to increase brand awareness and sales. The marketing team has proposed two different strategies.',
          options: [
            'Focus on social media advertising, using targeted ads on platforms like Facebook and Instagram to reach a younger audience.',
            'Invest in traditional advertising methods like television commercials and billboard ads, which have a wider reach and a more established audience.',
          ],
        },
        {
          id: 'ws-008',
          topic: 'Work & Career',
          title: 'New Office Layout',
          prompt: 'A company is redesigning its office space to improve employee collaboration and productivity. The design team has presented two different layout options.',
          options: [
            'Adopt an open-plan office layout with shared workspaces and minimal barriers between employees to foster collaboration.',
            'Maintain a traditional office layout with individual offices and cubicles to provide privacy and reduce distractions.',
          ],
        },
        {
          id: 'ws-009',
          topic: 'Work & Career',
          title: 'Employee Benefit Program',
          prompt: 'A company is introducing a new employee benefit to improve job satisfaction and retention. The HR department is considering two different options.',
          options: [
            'Offer free gym memberships to encourage employees to stay active and healthy.',
            'Provide extra paid vacation days to help employees maintain a better work-life balance.',
          ],
        },
        {
          id: 'ws-010',
          topic: 'Community & Services',
          title: 'Community Charity Event',
          prompt: 'A local charity is organizing a fundraising event to support its programs and is deciding between two event formats.',
          options: [
            'Host a formal gala dinner with a silent auction, targeting wealthy donors and businesses for large donations.',
            'Organize a community fun run, encouraging broader participation and smaller individual contributions.',
          ],
        },
        {
          id: 'ws-011',
          topic: 'Money & Shopping',
          title: 'Product Packaging Redesign',
          prompt: 'A company is planning to redesign the packaging of its products to improve sales and appeal to more customers. The design team has two concepts in mind.',
          options: [
            'Switch to eco-friendly packaging made from recycled materials, appealing to environmentally conscious consumers.',
            'Use premium packaging with a more luxurious feel, targeting high-end customers who value aesthetics.',
          ],
        },
        {
          id: 'ws-012',
          topic: 'Education & Learning',
          title: 'School Expansion',
          prompt: 'A school is expanding its facilities to accommodate a growing student population and is considering two different building designs.',
          options: [
            'Build a modern school building with cutting-edge technology, spacious classrooms, and flexible learning spaces.',
            'Construct a traditional school building with large outdoor spaces, sports facilities, and a focus on physical activities.',
          ],
        },
        {
          id: 'ws-013',
          topic: 'Community & Services',
          title: 'Library Update',
          prompt: 'A local library is planning to update its facilities to better serve the community and is debating between two options.',
          options: [
            'Create a digital media center with e-books, computers, and access to online resources, appealing to tech-savvy patrons.',
            'Expand the physical book collection and reading areas, preserving the traditional library experience and catering to avid readers.',
          ],
        },
        {
          id: 'ws-014',
          topic: 'Work & Career',
          title: 'Work-Life Balance Initiative',
          prompt: 'A company is introducing a new initiative to improve work-life balance for its employees and is considering two different approaches.',
          options: [
            'Allow employees to work from home two days a week, providing flexibility and reducing commute times.',
            'Offer a four-day workweek with longer hours each day, giving employees a three-day weekend to recharge.',
          ],
        },
        {
          id: 'ws-015',
          topic: 'Money & Shopping',
          title: 'New Product Launch',
          prompt: 'A company is preparing to launch a new product and has two different product concepts to choose from.',
          options: [
            'Launch a high-end luxury product aimed at affluent customers who are willing to pay a premium for quality and exclusivity.',
            'Introduce an affordable, mass-market product designed to appeal to a broad audience and generate high sales volume.',
          ],
        },
        {
          id: 'ws-016',
          topic: 'Travel & Transport',
          title: 'Tourism Promotion',
          prompt: 'A city is planning a new tourism promotion campaign to attract more visitors and is deciding between two strategies.',
          options: [
            'Highlight the city’s historical landmarks and cultural heritage, appealing to tourists interested in history and tradition.',
            'Focus on the city’s modern attractions, nightlife, and entertainment options, targeting younger tourists looking for a vibrant experience.',
          ],
        },
        {
          id: 'ws-017',
          topic: 'Education & Learning',
          title: 'New School Policy',
          prompt: 'A high school is considering a new policy to improve student performance and is debating between two options.',
          options: [
            'Extend the school day by one hour, providing more time for instruction and academic support.',
            'Reduce homework and focus on in-class activities to reduce student stress and improve learning outcomes.',
          ],
        },
        {
          id: 'ws-018',
          topic: 'Leisure & Culture',
          title: 'Museum Exhibit',
          prompt: 'A museum is planning its next major exhibit and has two potential themes to choose from.',
          options: [
            'Create an exhibit on ancient civilizations, exploring their impact on modern society and showcasing rare artifacts.',
            'Develop an exhibit on the evolution of technology, highlighting key innovations and their influence on daily life.',
          ],
        },
        {
          id: 'ws-019',
          topic: 'Work & Career',
          title: 'Corporate Dress Code',
          prompt: 'A company is revising its dress code policy to reflect changing workplace norms and is considering two different options.',
          options: [
            'Maintain a business formal dress code, requiring employees to wear suits, ties, and professional attire at all times.',
            'Adopt a business casual dress code, allowing more flexibility in clothing choices while still maintaining a professional appearance.',
          ],
        },
        {
          id: 'ws-020',
          topic: 'Health & Wellness',
          title: 'Healthcare Plan',
          prompt: 'A company is introducing a new healthcare plan for its employees and is choosing between two options.',
          options: [
            'Offer a healthcare plan with lower premiums but higher deductibles, making it more affordable upfront but with higher out-of-pocket costs.',
            'Provide a healthcare plan with higher premiums but lower deductibles, reducing out-of-pocket costs for employees at the expense of higher monthly payments.',
          ],
        },
        {
          id: 'ws-021',
          topic: 'Food & Dining',
          title: 'School Lunch Program',
          prompt: 'A school is updating its lunch program to provide healthier and more appealing options for students. The school administration is considering two different menus.',
          options: [
            'Implement a menu focused on organic and locally sourced foods, promoting health and sustainability.',
            'Introduce a menu offering a wide variety of international cuisines, exposing students to diverse cultures and flavors.',
          ],
        },
        {
          id: 'ws-022',
          topic: 'Work & Career',
          title: 'Corporate Social Event',
          prompt: 'A company is planning a social event to boost employee morale and team cohesion. The event planning committee has narrowed it down to two ideas.',
          options: [
            'Host a formal dinner with speeches, awards, and entertainment, offering a sophisticated evening for employees to dress up and celebrate.',
            'Organize an outdoor picnic with games, activities, and casual dining, creating a relaxed and family-friendly atmosphere.',
          ],
        },
        {
          id: 'ws-023',
          topic: 'Travel & Transport',
          title: 'Transportation Infrastructure',
          prompt: 'A city council is debating how to improve the city’s transportation infrastructure and is considering two different projects.',
          options: [
            'Expand the city’s subway system, increasing the number of lines and stations to reduce traffic congestion and make commuting easier.',
            'Build new bike lanes throughout the city, encouraging cycling as an eco-friendly and healthy alternative to driving.',
          ],
        },
        {
          id: 'ws-024',
          topic: 'Health & Wellness',
          title: 'New Fitness Program',
          prompt: 'A company is introducing a fitness program to help employees stay healthy and active. The HR department has two potential programs in mind.',
          options: [
            'Offer group fitness classes at the office, providing convenient and structured exercise opportunities during the workday.',
            'Provide subsidized gym memberships, allowing employees to choose their own fitness activities and schedule.',
          ],
        },
        {
          id: 'ws-025',
          topic: 'Education & Learning',
          title: 'University Research Focus',
          prompt: 'A university is deciding on a new area of research to prioritize, aiming to enhance its reputation and attract funding.',
          options: [
            'Focus on renewable energy technologies, contributing to the global effort to combat climate change and promote sustainability.',
            'Prioritize research in artificial intelligence and machine learning, positioning the university at the forefront of technological innovation.',
          ],
        },
        {
          id: 'ws-026',
          topic: 'Leisure & Culture',
          title: 'New Tourist Attraction',
          prompt: 'A city is planning to build a new tourist attraction to boost its economy and draw more visitors. The tourism board is considering two different projects.',
          options: [
            'Build a large theme park with rides, entertainment, and attractions for all ages, appealing to families and tourists looking for fun.',
            'Develop a cultural center showcasing local art, history, and traditions, attracting visitors interested in learning about the region’s heritage.',
          ],
        },
        {
          id: 'ws-027',
          topic: 'Work & Career',
          title: 'Corporate Expansion Strategy',
          prompt: 'A company is planning to expand internationally and is deciding between two potential markets to enter.',
          options: [
            'Enter a rapidly growing market in Asia, where there is high demand for the company’s products but also significant competition.',
            'Expand into a stable, established market in Europe, where the company can build a strong presence with less risk and slower growth.',
          ],
        },
        {
          id: 'ws-028',
          topic: 'Travel & Transport',
          title: 'New Hotel Theme',
          prompt: 'A hotel is rebranding with a new theme to attract more guests and differentiate itself from competitors. The management team is considering two different themes.',
          options: [
            'Create a luxurious, modern design with cutting-edge technology and high-end amenities, appealing to business travelers and affluent guests.',
            'Develop a rustic, nature-inspired design with eco-friendly features and a focus on relaxation, targeting tourists looking for a peaceful retreat.',
          ],
        },
        {
          id: 'ws-029',
          topic: 'Leisure & Culture',
          title: 'Community Art Project',
          prompt: 'A local government is funding a new community art project to beautify the city and engage residents. The arts committee is considering two different projects.',
          options: [
            'Commission a series of murals by local artists, transforming blank walls into vibrant works of art that reflect the community’s culture.',
            'Create a public sculpture garden, showcasing a variety of sculptures in a park setting where residents can enjoy art and nature together.',
          ],
        },
        {
          id: 'ws-030',
          topic: 'Environment & Nature',
          title: 'Energy Efficiency Program',
          prompt: 'A company is launching an energy efficiency program to reduce its environmental impact and save on energy costs. The sustainability team is considering two options.',
          options: [
            'Install solar panels on all company buildings, generating clean energy and reducing reliance on the grid.',
            'Implement energy-saving technologies like smart thermostats and LED lighting, improving efficiency and reducing overall energy consumption.',
          ],
        },
        {
          id: 'ws-031',
          topic: 'Education & Learning',
          title: 'School Field Trip',
          prompt: 'A school is planning a major field trip for students and is choosing between two destinations. The trip is intended to be both educational and enjoyable.',
          options: [
            'Take students to a national historical site, where they can learn about the country’s history and explore important landmarks.',
            'Visit a major science museum, offering interactive exhibits and hands-on learning opportunities in science and technology.',
          ],
        },
        {
          id: 'ws-032',
          topic: 'Work & Career',
          title: 'Employee Incentive Program',
          prompt: 'A company is introducing a new incentive program to motivate employees and reward high performance. The HR department is considering two different approaches.',
          options: [
            'Offer performance-based bonuses, rewarding employees who exceed their targets with financial incentives.',
            'Provide stock options and profit sharing, giving employees a stake in the company’s success and long-term growth.',
          ],
        },
        {
          id: 'ws-033',
          topic: 'Education & Learning',
          title: 'University Admissions Policy',
          prompt: 'A university is revising its admissions policy to attract a more diverse and talented student body. The admissions office is debating between two approaches.',
          options: [
            'Place more emphasis on standardized test scores, ensuring that admitted students have strong academic abilities.',
            'Focus more on extracurricular activities, personal statements, and interviews, valuing well-rounded candidates with diverse experiences.',
          ],
        },
        {
          id: 'ws-034',
          topic: 'Community & Services',
          title: 'City Public Space Renovation',
          prompt: 'A city is renovating a major public space to make it more attractive and accessible to residents. The city planners have two design concepts in mind.',
          options: [
            'Create a modern plaza with fountains, seating areas, and spaces for events and performances, making it a vibrant hub for social activities.',
            'Develop a green park with trees, gardens, walking paths, and recreational areas, providing a peaceful retreat for residents to relax and enjoy nature.',
          ],
        },
        {
          id: 'ws-035',
          topic: 'Health & Wellness',
          title: 'Corporate Wellness Challenge',
          prompt: 'A company is organizing a wellness challenge to encourage employees to adopt healthier lifestyles. The HR team has come up with two different challenges.',
          options: [
            'Host a weight loss challenge with prizes for employees who achieve the highest percentage of weight loss.',
            'Organize a step-count challenge where employees compete to walk the most steps over a set period, promoting daily physical activity.',
          ],
        },
        {
          id: 'ws-036',
          topic: 'Money & Shopping',
          title: 'New Retail Store Concept',
          prompt: 'A retail company is opening a new store and is deciding between two different concepts to attract customers and drive sales.',
          options: [
            'Develop a high-tech store with interactive displays, self-checkout stations, and a seamless digital experience, appealing to tech-savvy shoppers.',
            'Create a boutique-style store with personalized customer service, unique product offerings, and a cozy atmosphere, attracting customers who value a personalized shopping experience.',
          ],
        },
        {
          id: 'ws-037',
          topic: 'Work & Career',
          title: 'Employee Recognition Program',
          prompt: 'A company is launching a new employee recognition program to acknowledge hard work and dedication. The HR department is considering two different formats.',
          options: [
            'Implement a monthly recognition program, where top performers are awarded with certificates, bonuses, and public acknowledgment.',
            'Organize an annual awards ceremony, with significant prizes and recognition for employees who have consistently excelled throughout the year.',
          ],
        },
        {
          id: 'ws-038',
          topic: 'Environment & Nature',
          title: 'Corporate Sustainability Initiative',
          prompt: 'A company is implementing a sustainability initiative to reduce its environmental footprint. The leadership team is deciding between two different strategies.',
          options: [
            'Focus on reducing plastic use by eliminating single-use items, encouraging employees and customers to switch to reusable alternatives.',
            'Invest in carbon offset programs to neutralize the company’s emissions, contributing to global efforts to combat climate change.',
          ],
        },
        {
          id: 'ws-039',
          topic: 'Education & Learning',
          title: 'School Uniform Policy',
          prompt: 'A school is revising its uniform policy to reflect changing societal norms and parental feedback. The school board is considering two different options.',
          options: [
            'Implement a strict uniform policy with a standard set of clothing that all students must wear, promoting equality and reducing distractions.',
            'Adopt a more relaxed dress code that allows students to express their individuality while maintaining a neat and appropriate appearance.',
          ],
        },
        {
          id: 'ws-040',
          topic: 'Work & Career',
          title: 'Office Space Expansion',
          prompt: 'A company is expanding its office space to accommodate more employees and improve working conditions. The design team has proposed two different layouts.',
          options: [
            'Design a modern, open-concept office with collaborative spaces, flexible seating, and plenty of natural light.',
            'Create a traditional office layout with individual offices, meeting rooms, and quiet zones for focused work.',
          ],
        },
        {
          id: 'ws-041',
          topic: 'Work & Career',
          title: 'New Corporate Headquarters Location',
          prompt: 'A company is choosing a location for its new headquarters to improve operational efficiency and attract top talent. The leadership team has two cities in mind.',
          options: [
            'Relocate to a major metropolitan area with a large talent pool, better infrastructure, and more business opportunities.',
            'Move to a smaller city with lower operating costs, a higher quality of life, and a supportive local business community.',
          ],
        },
        {
          id: 'ws-042',
          topic: 'Money & Shopping',
          title: 'New Product Development',
          prompt: 'A company is developing a new product and has two different concepts that could both be successful. The product development team needs to make a choice.',
          options: [
            'Create a high-tech gadget aimed at young professionals who value innovation, convenience, and cutting-edge technology.',
            'Develop a simple, eco-friendly product for everyday use, appealing to consumers who prioritize sustainability and practicality.',
          ],
        },
        {
          id: 'ws-043',
          topic: 'Education & Learning',
          title: 'University Online Course Expansion',
          prompt: 'A university is expanding its online course offerings to reach more students and increase enrollment. The academic committee is considering two focus areas.',
          options: [
            'Develop professional development courses for working adults, offering flexible learning options to enhance their skills and advance their careers.',
            'Expand online degree programs for international students, making higher education more accessible to a global audience.',
          ],
        },
        {
          id: 'ws-044',
          topic: 'Environment & Nature',
          title: 'City Clean Energy Plan',
          prompt: 'A city is implementing a clean energy plan to reduce its carbon footprint and improve air quality. The city council is debating between two different approaches.',
          options: [
            'Invest in wind and solar power, building renewable energy facilities that can supply clean electricity to the entire city.',
            'Focus on improving energy efficiency in buildings, upgrading insulation, lighting, and heating systems to reduce overall energy consumption.',
          ],
        },
        {
          id: 'ws-045',
          topic: 'Leisure & Culture',
          title: 'New Movie Theater Concept',
          prompt: 'A company is opening a new movie theater and is considering two different themes to attract customers and provide a unique experience.',
          options: [
            'Create a luxury theater with reclining seats, gourmet food, and premium services, catering to customers looking for an upscale experience.',
            'Develop a retro-themed theater with classic movies, vintage decor, and an old-fashioned concession stand, appealing to nostalgia and movie buffs.',
          ],
        },
        {
          id: 'ws-046',
          topic: 'Health & Wellness',
          title: 'Employee Wellness Program',
          prompt: 'A company is introducing a wellness program to support employee health and well-being. The HR department is evaluating two different options.',
          options: [
            'Focus on mental health support, providing access to counseling, stress management workshops, and mindfulness programs.',
            'Promote physical health by offering fitness classes, nutrition advice, and wellness challenges to encourage a healthy lifestyle.',
          ],
        },
        {
          id: 'ws-047',
          topic: 'Work & Career',
          title: 'Corporate Diversity Initiative',
          prompt: 'A company is launching a diversity initiative to create a more inclusive workplace. The leadership team is considering two areas to focus on.',
          options: [
            'Focus on recruiting more diverse candidates, implementing hiring practices that attract and retain talent from various backgrounds.',
            'Provide diversity training for existing employees, fostering an inclusive culture and educating the workforce on the importance of diversity.',
          ],
        },
        {
          id: 'ws-048',
          topic: 'Technology & Online',
          title: 'School Technology Investment',
          prompt: 'A school is investing in new technology to enhance the learning experience for students. The administration is considering two different options.',
          options: [
            'Provide every student with a tablet or laptop, ensuring they have the tools they need for digital learning and research.',
            'Upgrade classroom technology with interactive whiteboards, projectors, and other devices that support innovative teaching methods.',
          ],
        },
        {
          id: 'ws-049',
          topic: 'Travel & Transport',
          title: 'City Infrastructure Improvement',
          prompt: 'A city is planning to improve its infrastructure to support growth and enhance the quality of life for residents. The city planners are debating between two projects.',
          options: [
            'Repair and expand the road network, reducing traffic congestion and improving connectivity between different parts of the city.',
            'Upgrade public transportation systems, making it easier and more convenient for residents to travel without relying on cars.',
          ],
        },
        {
          id: 'ws-050',
          topic: 'Community & Services',
          title: 'Corporate Volunteer Program',
          prompt: 'A company is launching a volunteer program to encourage employees to give back to the community. The HR team has proposed two different models.',
          options: [
            'Partner with local charities to offer a variety of volunteer opportunities that employees can choose from based on their interests.',
            'Organize company-wide volunteer events twice a year, bringing employees together for large-scale community service projects.',
          ],
        },
        {
          id: 'ws-051',
          topic: 'Education & Learning',
          title: 'University Study Abroad Program',
          prompt: 'A university is expanding its study abroad program to provide more opportunities for students to gain international experience. The academic committee is considering two destinations.',
          options: [
            'Expand a well-established program in Europe, offering students the chance to study in a diverse and culturally rich environment.',
            'Develop a new program in a developing country, providing students with the opportunity to contribute to community development and gain a unique perspective.',
          ],
        },
        {
          id: 'ws-052',
          topic: 'Money & Shopping',
          title: 'Retail Customer Loyalty Program',
          prompt: 'A retail company is introducing a customer loyalty program to increase repeat business and build customer loyalty. The marketing team is considering two different approaches.',
          options: [
            'Implement a points-based system, where customers earn points for every purchase that can be redeemed for discounts and rewards.',
            'Create a membership program with exclusive discounts, early access to sales, and special events for loyal customers.',
          ],
        },
        {
          id: 'ws-053',
          topic: 'Environment & Nature',
          title: 'City Recycling Program',
          prompt: 'A city is improving its recycling program to reduce waste and promote environmental sustainability. The city council is debating between two initiatives.',
          options: [
            'Introduce mandatory recycling for all residents, requiring households to separate recyclables from their waste.',
            'Offer incentives for residents who recycle, such as discounts on utility bills or vouchers for local businesses.',
          ],
        },
        {
          id: 'ws-054',
          topic: 'Community & Services',
          title: 'Corporate Sponsorship Strategy',
          prompt: 'A company is planning a sponsorship strategy to increase brand visibility and support community initiatives. The marketing team is considering two options.',
          options: [
            'Sponsor a major sports team, gaining exposure through media coverage, events, and merchandise.',
            'Sponsor local community events, building goodwill and a strong presence in the company’s home market.',
          ],
        },
        {
          id: 'ws-055',
          topic: 'Environment & Nature',
          title: 'School Environmental Initiative',
          prompt: 'A school is launching an environmental initiative to educate students and promote sustainability. The administration is considering two different programs.',
          options: [
            'Start a school garden and composting program, teaching students about organic farming and waste reduction.',
            'Implement a recycling and waste reduction program, focusing on reducing the school’s environmental impact and educating students on sustainability.',
          ],
        },
        {
          id: 'ws-056',
          topic: 'Health & Wellness',
          title: 'City Public Health Campaign',
          prompt: 'A city is planning a public health campaign to improve the well-being of its residents. The city health department is considering two different focus areas.',
          options: [
            'Promote healthy eating and exercise, encouraging residents to adopt healthier lifestyles and reduce the risk of chronic diseases.',
            'Focus on mental health awareness and support, providing resources and education to help residents manage stress, anxiety, and other mental health issues.',
          ],
        },
        {
          id: 'ws-057',
          topic: 'Community & Services',
          title: 'New Public Library Feature',
          prompt: 'A public library is adding a new feature to attract more visitors and provide additional resources to the community. The library board is considering two options.',
          options: [
            'Create a makerspace with tools for DIY projects, crafts, and technology, offering a hands-on learning environment for all ages.',
            'Develop a digital media center with access to online resources, e-books, and computers, providing a modern, tech-focused service for library patrons.',
          ],
        },
        {
          id: 'ws-058',
          topic: 'Travel & Transport',
          title: 'Employee Travel Policy',
          prompt: 'A company is updating its travel policy to reduce costs and improve efficiency. The HR department is evaluating two different options.',
          options: [
            'Encourage video conferencing and remote meetings to reduce the need for business travel, saving time and money.',
            'Increase the travel budget to allow for more in-person meetings and conferences, fostering better relationships and collaboration.',
          ],
        },
        {
          id: 'ws-059',
          topic: 'Education & Learning',
          title: 'University Campus Expansion',
          prompt: 'A university is expanding its campus to accommodate more students and improve facilities. The administration is considering two different projects.',
          options: [
            'Build new dormitories and student housing to provide more on-campus living options and create a stronger campus community.',
            'Construct new academic buildings and research facilities to enhance the university’s academic offerings and attract top faculty and students.',
          ],
        },
        {
          id: 'ws-060',
          topic: 'Money & Shopping',
          title: 'Retail Store Expansion',
          prompt: 'A retail company is expanding its operations and is choosing between two new store locations. The management team is evaluating the potential benefits of each.',
          options: [
            'Open a new store in a major shopping mall, taking advantage of high foot traffic and established consumer base.',
            'Open a new store in a trendy, up-and-coming neighborhood, attracting a younger, more fashion-forward clientele.',
          ],
        },
        {
          id: 'ws-061',
          topic: 'Leisure & Culture',
          title: 'City Cultural Festival',
          prompt: 'A city is planning its annual cultural festival and needs to choose a theme to attract both residents and tourists. The cultural committee is considering two different themes.',
          options: [
            'Celebrate the city’s historical heritage, showcasing traditional music, dance, food, and crafts that reflect the community’s roots.',
            'Highlight the city’s modern art and music scene, featuring contemporary artists, musicians, and performers who represent the city’s current cultural vibrancy.',
          ],
        },
        {
          id: 'ws-062',
          topic: 'Health & Wellness',
          title: 'Corporate Health and Safety Program',
          prompt: 'A company is introducing a health and safety program to protect employees and reduce workplace accidents. The safety team is considering two different initiatives.',
          options: [
            'Focus on workplace safety training and accident prevention, providing regular workshops and updates on safety protocols.',
            'Implement a wellness program to reduce stress and burnout, offering resources and activities that promote physical and mental well-being.',
          ],
        },
        {
          id: 'ws-063',
          topic: 'Education & Learning',
          title: 'School Extracurricular Focus',
          prompt: 'A school is expanding its extracurricular activities to provide more opportunities for students. The administration is deciding between two different focus areas.',
          options: [
            'Increase the number of sports teams and athletic programs, promoting physical fitness, teamwork, and school spirit.',
            'Expand the arts and music programs, encouraging creativity, self-expression, and cultural appreciation among students.',
          ],
        },
        {
          id: 'ws-064',
          topic: 'Community & Services',
          title: 'New Community Center',
          prompt: 'A city is building a new community center to serve residents of all ages and backgrounds. The city planners are considering two different designs.',
          options: [
            'Create a modern facility with a gym, swimming pool, and meeting rooms, offering a wide range of recreational and social activities.',
            'Develop a traditional center with a large hall for events, classes, and community gatherings, fostering a sense of togetherness and belonging.',
          ],
        },
        {
          id: 'ws-065',
          topic: 'Technology & Online',
          title: 'Employee Communication Tool',
          prompt: 'A company is introducing a new communication tool to improve collaboration and streamline workflows. The IT department has proposed two different tools.',
          options: [
            'Implement a messaging app for instant communication, allowing employees to quickly share information and collaborate in real-time.',
            'Introduce a project management tool with integrated communication features, helping teams stay organized and track progress on tasks.',
          ],
        },
        {
          id: 'ws-066',
          topic: 'Education & Learning',
          title: 'University Library Upgrade',
          prompt: 'A university is upgrading its library to better support students and faculty in their research and studies. The administration is considering two different projects.',
          options: [
            'Expand the physical book collection and create more study spaces, preserving the traditional library experience.',
            'Invest in digital resources and online databases, providing students and faculty with access to the latest research and information.',
          ],
        },
        {
          id: 'ws-067',
          topic: 'Community & Services',
          title: 'City Safety Initiative',
          prompt: 'A city is launching a safety initiative to protect residents and reduce crime. The city council is debating between two different strategies.',
          options: [
            'Increase police presence and patrols in high-crime areas, providing a visible deterrent to criminal activity.',
            'Implement community watch programs and safety education initiatives, empowering residents to take an active role in keeping their neighborhoods safe.',
          ],
        },
        {
          id: 'ws-068',
          topic: 'Work & Career',
          title: 'Corporate Hiring Strategy',
          prompt: 'A company is revising its hiring strategy to attract the best talent and fill key positions. The HR department is considering two different approaches.',
          options: [
            'Focus on hiring experienced professionals with a proven track record, ensuring the company can rely on their expertise and knowledge.',
            'Prioritize hiring and training recent graduates, bringing in fresh perspectives and helping them grow within the company.',
          ],
        },
        {
          id: 'ws-069',
          topic: 'Food & Dining',
          title: 'School Nutrition Program',
          prompt: 'A school is updating its nutrition program to provide healthier meals and promote good eating habits among students. The administration is evaluating two options.',
          options: [
            'Provide free healthy meals to all students, ensuring that every child has access to nutritious food regardless of their family’s income.',
            'Introduce cooking and nutrition classes, teaching students how to make healthy food choices and prepare meals for themselves.',
          ],
        },
        {
          id: 'ws-070',
          topic: 'Travel & Transport',
          title: 'City Tourism Infrastructure',
          prompt: 'A city is improving its tourism infrastructure to attract more visitors and enhance the experience for tourists. The city council is considering two different projects.',
          options: [
            'Build a new visitor center with interactive exhibits, information desks, and amenities to help tourists make the most of their visit.',
            'Develop new walking and biking trails around the city, offering tourists a unique and active way to explore the area.',
          ],
        },
        {
          id: 'ws-071',
          topic: 'Work & Career',
          title: 'Corporate Training Method',
          prompt: 'A company is choosing a training method for new employees to ensure they are well-prepared for their roles. The HR department has proposed two different approaches.',
          options: [
            'Implement an in-depth onboarding process with a mentor program, providing personalized guidance and support for new hires.',
            'Offer online training modules that employees can complete at their own pace, allowing for flexibility and convenience.',
          ],
        },
        {
          id: 'ws-072',
          topic: 'Education & Learning',
          title: 'School Dress Code',
          prompt: 'A school is revising its dress code policy to reflect changes in societal attitudes and student preferences. The school board is considering two different approaches.',
          options: [
            'Implement a strict uniform policy, requiring all students to wear the same attire to promote equality and reduce distractions.',
            'Allow students to wear casual, appropriate clothing, giving them more freedom to express their individuality while maintaining a respectful school environment.',
          ],
        },
        {
          id: 'ws-073',
          topic: 'Environment & Nature',
          title: 'City Green Space Development',
          prompt: 'A city is developing new green spaces to provide residents with more opportunities to enjoy nature and outdoor activities. The city planners are considering two designs.',
          options: [
            'Create a large public park with sports facilities, playgrounds, and open areas for picnics and gatherings, offering a central space for recreation.',
            'Develop a series of smaller community gardens and green spaces throughout the city, providing more localized, accessible nature areas for residents.',
          ],
        },
        {
          id: 'ws-074',
          topic: 'Technology & Online',
          title: 'Corporate Communication Strategy',
          prompt: 'A company is updating its communication strategy to improve internal and external interactions. The leadership team is considering two different approaches.',
          options: [
            'Focus on internal newsletters and email updates, providing regular information and keeping employees informed about company news.',
            'Introduce a company-wide messaging platform, allowing for real-time communication and collaboration among employees across departments.',
          ],
        },
        {
          id: 'ws-075',
          topic: 'Education & Learning',
          title: 'University Admissions Focus',
          prompt: 'A university is revising its admissions criteria to attract a more diverse and talented student body. The admissions office is considering two different focus areas.',
          options: [
            'Emphasize academic achievements and standardized test scores, ensuring that admitted students have strong academic abilities.',
            'Focus on extracurricular activities and leadership roles, valuing well-rounded candidates who contribute to their communities and show potential for future success.',
          ],
        },
        {
          id: 'ws-076',
          topic: 'Work & Career',
          title: 'Corporate Team-Building Activity',
          prompt: 'A company is organizing a team-building activity to improve employee relationships and morale. The HR department has proposed two different activities.',
          options: [
            'Organize an outdoor adventure course, with activities like rock climbing, zip-lining, and team challenges that promote physical fitness and teamwork.',
            'Host a creative workshop, such as painting, cooking, or music, allowing employees to express themselves and bond over shared interests.',
          ],
        },
        {
          id: 'ws-077',
          topic: 'Leisure & Culture',
          title: 'City Public Art Project',
          prompt: 'A city is funding a new public art project to beautify the area and engage residents. The arts committee is considering two different projects.',
          options: [
            'Commission a large mural in a prominent location, featuring local artists and themes that reflect the city’s culture and history.',
            'Install sculptures and art pieces throughout the city, creating a diverse and accessible public art experience for residents and visitors.',
          ],
        },
        {
          id: 'ws-078',
          topic: 'Education & Learning',
          title: 'School Discipline Policy',
          prompt: 'A school is revising its discipline policy to create a more effective and supportive learning environment. The administration is considering two different approaches.',
          options: [
            'Implement stricter rules and consequences for misbehavior, ensuring that students understand the importance of following school policies.',
            'Focus on restorative practices and conflict resolution, helping students learn from their mistakes and encouraging positive behavior.',
          ],
        },
        {
          id: 'ws-079',
          topic: 'Work & Career',
          title: 'Corporate Expansion Focus',
          prompt: 'A company is expanding its operations and needs to decide where to focus its efforts. The leadership team is considering two different growth strategies.',
          options: [
            'Enter new international markets, taking advantage of global opportunities and diversifying the company’s revenue streams.',
            'Expand product lines in existing markets, building on the company’s strengths and increasing market share within familiar territories.',
          ],
        },
        {
          id: 'ws-080',
          topic: 'Travel & Transport',
          title: 'City Traffic Management',
          prompt: 'A city is implementing a new traffic management plan to reduce congestion and improve transportation efficiency. The city planners are considering two different strategies.',
          options: [
            'Introduce congestion charges for busy areas, discouraging car use and reducing traffic during peak hours.',
            'Improve public transportation options, making it easier and more convenient for residents to travel without relying on personal vehicles.',
          ],
        },
        {
          id: 'ws-081',
          topic: 'Education & Learning',
          title: 'University Degree Program Expansion',
          prompt: 'A university is expanding its degree programs to attract more students and meet the needs of the job market. The academic committee is considering two different focus areas.',
          options: [
            'Emphasize STEM (Science, Technology, Engineering, Math) programs, preparing students for careers in high-demand fields with strong job prospects.',
            'Expand humanities and social sciences programs, fostering critical thinking, creativity, and an understanding of cultural and social issues.',
          ],
        },
        {
          id: 'ws-082',
          topic: 'Money & Shopping',
          title: 'Retail Store Layout',
          prompt: 'A retail company is redesigning its store layout to improve the shopping experience and increase sales. The design team is considering two different concepts.',
          options: [
            'Adopt a minimalist design with clear, open spaces, making it easy for customers to navigate and find what they’re looking for.',
            'Create a cozy, boutique-style layout with more products on display, encouraging customers to browse and discover new items.',
          ],
        },
        {
          id: 'ws-083',
          topic: 'Community & Services',
          title: 'City Public Safety Campaign',
          prompt: 'A city is launching a public safety campaign to protect residents and reduce crime. The city council is considering two different focus areas.',
          options: [
            'Focus on road safety and reducing traffic accidents, educating residents about safe driving practices and improving infrastructure.',
            'Promote personal safety and crime prevention, encouraging residents to take precautions and supporting community policing efforts.',
          ],
        },
        {
          id: 'ws-084',
          topic: 'Money & Shopping',
          title: 'Corporate Branding Strategy',
          prompt: 'A company is rebranding to stay competitive and appeal to a broader audience. The marketing team is considering two different strategies.',
          options: [
            'Focus on modern, sleek design and a strong digital presence, targeting younger, tech-savvy consumers who value innovation.',
            'Emphasize tradition and heritage in the branding, appealing to loyal customers who appreciate the company’s history and reputation.',
          ],
        },
        {
          id: 'ws-085',
          topic: 'Home & Housing',
          title: 'University Housing Policy',
          prompt: 'A university is revising its student housing policy to accommodate more students and improve campus life. The administration is considering two different approaches.',
          options: [
            'Guarantee on-campus housing for all first-year students, helping them transition to university life and build a strong community.',
            'Offer off-campus housing support and resources, providing students with more flexibility and options for where they live.',
          ],
        },
        {
          id: 'ws-086',
          topic: 'Environment & Nature',
          title: 'City Environmental Initiative',
          prompt: 'A city is launching a new environmental initiative to promote sustainability and reduce its carbon footprint. The city council is considering two different projects.',
          options: [
            'Increase recycling and waste reduction efforts, encouraging residents and businesses to recycle more and reduce landfill waste.',
            'Invest in green energy projects like solar and wind, providing clean, renewable energy for the city and reducing reliance on fossil fuels.',
          ],
        },
        {
          id: 'ws-087',
          topic: 'Community & Services',
          title: 'Corporate Philanthropy Focus',
          prompt: 'A company is deciding on a new philanthropic focus to give back to the community and support social causes. The leadership team is considering two different areas.',
          options: [
            'Support education and literacy programs, helping children and adults gain the skills they need to succeed in life.',
            'Focus on healthcare and disease prevention, funding research and providing resources to improve public health and well-being.',
          ],
        },
        {
          id: 'ws-088',
          topic: 'Family & Friends',
          title: 'School Parent Involvement Program',
          prompt: 'A school is introducing a new parent involvement program to strengthen the relationship between families and the school. The administration is considering two different approaches.',
          options: [
            'Organize regular parent-teacher meetings and workshops, providing parents with information and strategies to support their children’s education.',
            'Offer volunteer opportunities for parents in classrooms and at events, encouraging them to take an active role in the school community.',
          ],
        },
        {
          id: 'ws-089',
          topic: 'Technology & Online',
          title: 'Corporate Innovation Strategy',
          prompt: 'A company is revising its innovation strategy to stay competitive and drive growth. The leadership team is considering two different focus areas.',
          options: [
            'Invest in research and development for new products, creating innovative solutions that meet customer needs and open up new markets.',
            'Focus on improving and upgrading existing products, enhancing their features and performance to maintain a competitive edge.',
          ],
        },
      ],
    },
  ],
};
