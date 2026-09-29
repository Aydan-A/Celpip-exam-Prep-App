// CELPIP Speaking Part 6 — "Dealing with a Difficult Situation" bank (67).
// Titles and topics follow the user's reference list (#1–66, same order);
// #67 is the user's own example question. Claude wrote the situations at the
// user's request, in exam style: the situation, then two options — the
// test-taker picks ONE and talks to that person.
export const DIFFICULT_SITUATION_TOPICS = [
  'Work & Career',
  'Home & Housing',
  'Family & Friends',
  'Education & Learning',
  'Community & Services',
  'Travel & Transport',
  'Health & Wellness',
  'Leisure & Culture',
  'Environment & Nature',
  'Food & Dining',
  'Money & Shopping',
];

export const SPEAKING_DIFFICULT_SITUATION = [
  {
    title: 'Bakery Trainee Dilemma',
    topic: 'Work & Career',
    prompt: "You manage a small bakery. Your new trainee, who is your close friend's son, has arrived late four times this month and burned a full batch of bread yesterday. The owner has asked you to decide by Friday whether he stays.",
    options: [
      'Talk to the owner. Explain why the trainee deserves one more chance.',
      'Talk to your friend. Explain why you have to let their son go.',
    ],
  },
  {
    title: 'Surprise Parent Visit',
    topic: 'Home & Housing',
    prompt: 'Your parents have just called to say they are arriving this weekend to stay in your small apartment for two weeks as a surprise. Your roommate has a professional licensing exam next week, and you promised them a quiet home.',
    options: [
      'Talk to your parents. Explain why they should stay in a hotel nearby instead.',
      'Talk to your roommate. Explain why your parents need to stay with you.',
    ],
  },
  {
    title: 'Parents Anniversary Debate',
    topic: 'Family & Friends',
    prompt: "You and your sister are planning your parents' 30th wedding anniversary. Your sister wants a big party with 80 guests, while your aunt has already reserved a quiet dinner for the close family. The budget only allows one of the two.",
    options: [
      'Talk to your sister. Explain why a small family dinner is the better choice.',
      'Talk to your aunt. Explain why the family is choosing the big party instead.',
    ],
  },
  {
    title: 'Dinner Phone Rule Dispute',
    topic: 'Family & Friends',
    prompt: 'Your family has a strict "no phones at dinner" rule. Your teenage son says he needs his phone at the table because his school project group only meets online in the evenings. Your spouse insists the rule must not change.',
    options: [
      'Talk to your son. Explain why the rule stays in place.',
      'Talk to your spouse. Explain why your son should get an exception until the project ends.',
    ],
  },
  {
    title: 'Jewellery Return Dispute',
    topic: 'Work & Career',
    prompt: 'You work at a jewellery store. A loyal customer wants to return a $900 necklace she bought 45 days ago, but the store only accepts returns within 30 days. Your manager is away today, and the customer is becoming upset.',
    options: [
      'Talk to the customer. Explain why you cannot accept the return.',
      'Talk to your manager. Explain why you decided to accept the return anyway.',
    ],
  },
  {
    title: 'Play Filming Ban Dilemma',
    topic: 'Leisure & Culture',
    prompt: "You are directing a community theatre play. The theatre does not allow any filming during shows because of copyright rules. The lead actor's grandparents live overseas and cannot attend, so she asks you to let her family film the opening night.",
    options: [
      'Talk to the actor. Explain why her family cannot film the show.',
      'Talk to the theatre manager. Explain why you want permission for a short private recording.',
    ],
  },
  {
    title: 'Vet Bill Payment Plan',
    topic: 'Work & Career',
    prompt: "You are the receptionist at a veterinary clinic. A long-time client's dog needs urgent surgery that costs $2,500, but the client can only pay half today. Clinic policy says the full amount must be paid before any surgery.",
    options: [
      'Talk to the client. Explain why the clinic cannot go ahead without full payment.',
      'Talk to the clinic owner. Explain why this client should be offered a payment plan.',
    ],
  },
  {
    title: 'Senior Bus Route Dispute',
    topic: 'Travel & Transport',
    prompt: "You sit on your city's transit committee. The city wants to cancel a quiet bus route that stops at a seniors' residence and use the buses for a new express route for commuters. The committee has asked you to make the final call.",
    options: [
      "Talk to the director of the seniors' residence. Explain why the route will be cancelled.",
      'Talk to the city transit planner. Explain why the route must stay.',
    ],
  },
  {
    title: 'Fitness Class Rescheduling',
    topic: 'Work & Career',
    prompt: 'You are a fitness instructor. The gym manager wants to move your popular 6 p.m. class to 6 a.m. to make room for a new program. Many of your regular members work early shifts and could not attend a morning class.',
    options: [
      'Talk to the gym manager. Explain why your class should stay at 6 p.m.',
      'Talk to your regular members. Explain why the class is moving to the morning.',
    ],
  },
  {
    title: 'Laundry Slot Dispute',
    topic: 'Home & Housing',
    prompt: 'Your building has one shared laundry room with a sign-up sheet. For the past month, a neighbour has been using your Saturday morning slot because her work schedule changed. You work long weekdays, and Saturday morning is your only free time.',
    options: [
      'Talk to your neighbour. Explain why you need your Saturday slot back.',
      'Talk to the building manager. Explain the problem and ask them to sort out the schedule.',
    ],
  },
  {
    title: 'Birthday Magician Cancellation',
    topic: 'Family & Friends',
    prompt: "The magician you booked for your seven-year-old's birthday party this Saturday has just cancelled. A friend has offered to do a few magic tricks for free, but your child was promised a \"real magician\". A last-minute entertainer would cost $300 more.",
    options: [
      'Talk to your child. Explain that your friend will do the magic show instead.',
      'Talk to your partner. Explain why you want to spend the extra money on a professional.',
    ],
  },
  {
    title: 'Hospital Visitor Limit',
    topic: 'Health & Wellness',
    prompt: 'Your grandmother is in the hospital, which allows only two visitors at a time. Relatives have flown in from abroad and all want to see her together tonight, but her nurse says she is very tired after her treatment.',
    options: [
      'Talk to your relatives. Explain why only two of them can visit tonight.',
      'Talk to the nurse. Explain why the family is asking for a short group visit.',
    ],
  },
  {
    title: 'Wedding Catering Crisis',
    topic: 'Work & Career',
    prompt: 'You work for a catering company. Two days before a wedding, your supplier says the salmon the couple chose for 120 guests is not available. You can serve chicken instead, or buy salmon from another supplier at twice the price.',
    options: [
      'Talk to the couple. Explain why the menu has to change to chicken.',
      'Talk to your boss. Explain why the company should pay extra for the salmon.',
    ],
  },
  {
    title: 'Restaurant Reservation Mistake',
    topic: 'Food & Dining',
    prompt: "You are the host at a restaurant. Because of a booking error, the private room has been reserved twice for this Friday: once for a company's retirement party and once for a family's 50th anniversary dinner. Both were booked weeks ago.",
    options: [
      'Talk to the company organizer. Explain why their party must move to the main dining room.',
      'Talk to the family. Explain why their dinner must move to the main dining room.',
    ],
  },
  {
    title: 'Early Morning Call Noise',
    topic: 'Home & Housing',
    prompt: 'Your roommate recently started working with a team overseas and takes loud video calls in the living room at 5 a.m. The noise wakes you up every day, and you have important presentations at work all this week.',
    options: [
      'Talk to your roommate. Ask them to take the calls in their bedroom.',
      'Talk to your landlord. Ask if a door or soundproofing can be added to the living room.',
    ],
  },
  {
    title: 'Non-Refundable Flight Dilemma',
    topic: 'Family & Friends',
    prompt: 'You and your best friend booked non-refundable flights to Mexico for next month. Today your sister announced that her wedding will be on the same weekend.',
    options: [
      'Talk to your friend. Explain why you are cancelling the trip.',
      'Talk to your sister. Explain why you will miss her wedding.',
    ],
  },
  {
    title: 'Maid of Honour Dilemma',
    topic: 'Family & Friends',
    prompt: 'Your best friend and your cousin have both asked you to be the maid of honour at their weddings. You just found out that both weddings are on the same day, in two different cities.',
    options: [
      "Talk to your best friend. Explain why you will be at your cousin's wedding.",
      "Talk to your cousin. Explain why you will be at your best friend's wedding.",
    ],
  },
  {
    title: 'Carshare Return Delay',
    topic: 'Travel & Transport',
    prompt: "You borrowed your neighbour's car through a carshare app to get to a job interview. An accident has closed the highway, and you will be two hours late returning the car. Your neighbour needs it at 3 p.m. to get to work.",
    options: [
      'Talk to your neighbour. Explain the delay and offer to pay for a taxi.',
      'Talk to the interviewer. Ask to move the interview so you can return the car on time.',
    ],
  },
  {
    title: 'Holiday Potluck Allergy Dilemma',
    topic: 'Community & Services',
    prompt: 'You are organizing a holiday potluck at your community centre. A family whose child has a severe nut allergy asks for the whole event to be nut-free, but several long-time members always bring traditional dishes made with nuts.',
    options: [
      'Talk to the long-time members. Explain why this year the potluck will be nut-free.',
      'Talk to the family. Explain why there will be a separate, labelled nut-free table instead.',
    ],
  },
  {
    title: 'Language Exchange Seat Dilemma',
    topic: 'Education & Learning',
    prompt: 'You run a free language exchange at the public library with only 20 seats. A regular who often arrives late lost her seat to a newcomer from the waiting list, and she is upset because she has come every week for a year.',
    options: [
      'Talk to the regular. Explain why her seat went to the newcomer.',
      'Talk to the newcomer. Explain why the seat is going back to the regular.',
    ],
  },
  {
    title: 'Internship Overtime Dilemma',
    topic: 'Work & Career',
    prompt: 'You are doing an internship. Your supervisor asks you to stay late three evenings this week to finish an urgent report, but you have evening classes on those nights that you must attend to graduate.',
    options: [
      'Talk to your supervisor. Explain why you cannot stay late.',
      'Talk to your instructor. Explain why you will miss class this week.',
    ],
  },
  {
    title: 'Bike Storage Dilemma',
    topic: 'Home & Housing',
    prompt: "Your condo building's bike room is full, and the rules do not allow bikes on balconies or in hallways. You just bought an expensive e-bike and are worried it will be stolen if you lock it outside.",
    options: [
      'Talk to the condo board. Ask for permission to keep the bike on your balcony.',
      'Talk to your neighbour, who keeps two rarely used bikes in the bike room. Ask them to move one.',
    ],
  },
  {
    title: 'Promotion Secrecy Dilemma',
    topic: 'Work & Career',
    prompt: 'Your manager told you in confidence that you will be promoted to team lead next month. Your close co-worker, who also applied for the job, asks you directly if you have heard anything.',
    options: [
      'Talk to your co-worker. Tell them the truth about the promotion.',
      'Talk to your manager. Ask for permission to share the news early.',
    ],
  },
  {
    title: 'Breakroom Microwave Dispute',
    topic: 'Work & Career',
    prompt: 'You are the office coordinator. Forty employees share one breakroom microwave, and one co-worker heats strong-smelling fish every day. Several people have complained to you about the smell and the long lunch line.',
    options: [
      'Talk to the co-worker. Ask them to stop heating fish at work.',
      'Talk to the office manager. Ask for a second microwave and a lunch schedule.',
    ],
  },
  {
    title: 'Emergency Room Triage Dispute',
    topic: 'Health & Wellness',
    prompt: 'You are a receptionist in a hospital emergency room. A man who has waited four hours with a sprained wrist angrily demands to be seen before a patient who just arrived by ambulance.',
    options: [
      'Talk to the man. Explain why the other patient must be seen first.',
      'Talk to the charge nurse. Ask whether the man can be seen in the fast-track clinic.',
    ],
  },
  {
    title: 'Renovation Noise Conflict',
    topic: 'Home & Housing',
    prompt: 'You are renovating your kitchen, and the contractor works from 8 a.m. to 6 p.m. Your next-door neighbour, a nurse who works night shifts, asks you to stop all noisy work until noon. That would add a week and extra cost to the project.',
    options: [
      'Talk to your neighbour. Explain why the work has to continue as planned.',
      'Talk to your contractor. Ask them to do the noisy work only in the afternoons.',
    ],
  },
  {
    title: 'Hamster Return Dispute',
    topic: 'Work & Career',
    prompt: 'You work at a pet store. A parent brings back a hamster bought a week ago because their child has lost interest. Store policy does not accept returns of live animals after 48 hours.',
    options: [
      'Talk to the parent. Explain why you cannot take the hamster back.',
      'Talk to your manager. Explain why the store should accept this return.',
    ],
  },
  {
    title: 'Cat Allergy Visitor Dilemma',
    topic: 'Family & Friends',
    prompt: 'Your in-laws are coming to stay with you for a week, and your father-in-law is allergic to cats. You have two cats, and your partner wants to send them to a friend\'s house, but your cats get very stressed away from home.',
    options: [
      'Talk to your partner. Explain why the cats should stay home.',
      'Talk to your father-in-law. Explain why the cats will be away and what you have prepared.',
    ],
  },
  {
    title: 'Classmate Screenshot Leak Dilemma',
    topic: 'Education & Learning',
    prompt: 'A classmate posted screenshots of the answers to next week\'s exam in your study group chat. Your professor has warned that anyone who sees leaked material and does not report it could also be penalized.',
    options: [
      'Talk to your professor. Report what happened.',
      'Talk to your classmate. Tell them to confess to the professor by tomorrow.',
    ],
  },
  {
    title: 'Damaged Textbook Dilemma',
    topic: 'Education & Learning',
    prompt: 'You borrowed an expensive textbook from a classmate and spilled coffee on it, ruining several chapters. She needs it to study for the final exam next week, and a new copy costs $180, which is more than you can easily afford.',
    options: [
      'Talk to your classmate. Explain what happened and offer to buy her a new copy.',
      'Talk to your classmate. Explain what happened and offer your notes and half the cost instead.',
    ],
  },
  {
    title: 'Hiking Poles Dilemma',
    topic: 'Leisure & Culture',
    prompt: 'You are leading a hiking group on a steep, icy trail. You told everyone that hiking poles were required, but one participant has arrived without them. The group is ready to leave.',
    options: [
      'Talk to the participant. Explain why they cannot join the hike today.',
      'Talk to the group. Explain why you are lending your own poles and taking an easier route.',
    ],
  },
  {
    title: 'EV Charger Dispute',
    topic: 'Home & Housing',
    prompt: 'Your apartment building has only two electric vehicle chargers. A neighbour leaves his car plugged in all night, even when it is fully charged, so you often cannot charge your car before your early commute.',
    options: [
      'Talk to your neighbour. Ask him to move his car once it is charged.',
      'Talk to the building manager. Suggest a time limit for the chargers.',
    ],
  },
  {
    title: 'Library Study Room Overtime',
    topic: 'Education & Learning',
    prompt: 'You booked a library study room from 2 to 4 p.m. for your group project. At 2:20 the students before you are still there, studying for an exam tomorrow, and they ask for 30 more minutes. Your group presents tomorrow too.',
    options: [
      'Talk to the other students. Explain why they need to leave now.',
      'Talk to your group. Explain why you are letting the other students stay.',
    ],
  },
  {
    title: 'Wedding Camera Dilemma',
    topic: 'Work & Career',
    prompt: 'You are a wedding photographer. On the morning of a wedding, your main camera breaks, and your backup camera takes lower-quality photos. A friend can lend you a professional camera, but picking it up would make you an hour late.',
    options: [
      'Talk to the couple. Explain why you will be using your backup camera.',
      'Talk to the couple. Explain why you will arrive an hour late.',
    ],
  },
  {
    title: 'Fire Alarm Testing Dilemma',
    topic: 'Home & Housing',
    prompt: 'You are a building manager. The yearly fire alarm test is required by law and must happen on Tuesday between 9 a.m. and 5 p.m. A resident who works nights and has a newborn baby asks you to reschedule the test.',
    options: [
      'Talk to the resident. Explain why the test cannot be moved.',
      'Talk to the fire safety company. Ask them to test that floor first or at a different time.',
    ],
  },
  {
    title: 'Project Extension Dispute',
    topic: 'Education & Learning',
    prompt: 'You are the leader of a group project due Friday. One member had a family emergency and has not finished her section. The rest of the group wants to submit without it, but she asks you to request an extension.',
    options: [
      'Talk to your professor. Ask for an extension for the group.',
      'Talk to the group member. Explain why the group will submit on time without her section.',
    ],
  },
  {
    title: 'Emergency Babysitting Dilemma',
    topic: 'Family & Friends',
    prompt: 'Your sister calls and asks you to babysit her children tonight because of a work emergency. You already have concert tickets with a friend you have not seen in months.',
    options: [
      'Talk to your sister. Explain why you cannot babysit tonight.',
      'Talk to your friend. Explain why you have to cancel the concert.',
    ],
  },
  {
    title: 'Industry Conference Delegate',
    topic: 'Work & Career',
    prompt: 'Your company can send only one employee to an important industry conference in Vancouver. You and a colleague both want to go, and your manager has asked the two of you to decide by tomorrow.',
    options: [
      'Talk to your colleague. Explain why you should be the one to go.',
      'Talk to your manager. Explain why your colleague should go instead.',
    ],
  },
  {
    title: 'Class Recording Privacy Dilemma',
    topic: 'Education & Learning',
    prompt: "You teach an evening English class for adults. A student who works shifts asks to record the lessons so she can catch up, but another student is uncomfortable being recorded for privacy reasons.",
    options: [
      'Talk to the student who works shifts. Explain why lessons will not be recorded.',
      'Talk to the student who is uncomfortable. Explain why you will allow recording.',
    ],
  },
  {
    title: 'Shared Kitchen Cleanup Dispute',
    topic: 'Home & Housing',
    prompt: 'You share a house with three roommates. One of them, who is a close friend of yours, never cleans up the kitchen. The other two want to ask him to move out when the lease ends.',
    options: [
      'Talk to your friend. Explain that this is his last warning.',
      'Talk to the other roommates. Explain why he should get another chance.',
    ],
  },
  {
    title: 'Client Account Dispute',
    topic: 'Work & Career',
    prompt: 'You are a sales manager. Two of your sales representatives both claim they brought in a new client worth $200,000 a year, and only one of them can be named on the account and receive the bonus.',
    options: [
      'Talk to the senior representative. Explain why the account is going to the junior representative.',
      'Talk to the junior representative. Explain why the account is going to the senior representative.',
    ],
  },
  {
    title: 'Friend Move Versus Overtime',
    topic: 'Work & Career',
    prompt: 'You promised to help your best friend move to a new apartment on Saturday. Now your boss has offered you Saturday overtime at double pay, and you need the money to repair your car.',
    options: [
      'Talk to your friend. Explain why you cannot help with the move.',
      'Talk to your boss. Explain why you cannot work on Saturday.',
    ],
  },
  {
    title: 'Holiday Gift Allergy Dilemma',
    topic: 'Work & Career',
    prompt: 'For the office gift exchange tomorrow, you bought a $60 basket of nut chocolates for your assigned co-worker. You have just found out that she has a severe nut allergy, and the store does not accept returns.',
    options: [
      'Talk to your co-worker. Explain the mistake and that her real gift will come next week.',
      'Talk to the event organizer. Ask to swap your assigned person.',
    ],
  },
  {
    title: 'Sports Donation Dilemma',
    topic: 'Community & Services',
    prompt: "You are the treasurer of your community association. A local business has donated $5,000. The youth soccer club wants it for new equipment, and the seniors' club wants it for bus trips. The money can only go to one group.",
    options: [
      "Talk to the soccer coach. Explain why the money is going to the seniors' club.",
      "Talk to the seniors' club leader. Explain why the money is going to the soccer club.",
    ],
  },
  {
    title: 'Yoga Studio Relocation',
    topic: 'Community & Services',
    prompt: 'You run a small yoga studio in your community centre. The centre is raising your rent by 40%. You could move to a cheaper space across town, but many of your senior students would find it hard to get there.',
    options: [
      'Talk to your students. Explain why the studio is moving.',
      'Talk to the community centre manager. Ask for a smaller rent increase.',
    ],
  },
  {
    title: 'Dental Clinic Double-Booking',
    topic: 'Work & Career',
    prompt: 'You are a dental clinic receptionist. Two patients have been booked for the same 3 p.m. appointment: one took the afternoon off work for a cleaning, and the other has a painful toothache.',
    options: [
      'Talk to the patient with the cleaning. Explain why they need to reschedule.',
      'Talk to the patient with the toothache. Explain why they need to wait until 5 p.m.',
    ],
  },
  {
    title: 'Lost Phone Taxi Retrieval',
    topic: 'Travel & Transport',
    prompt: "You left your phone in a taxi on the way to the airport. The driver called the airline to say he found it and can bring it back in an hour, but your flight to a friend's wedding boards in 40 minutes.",
    options: [
      'Talk to the airline agent. Ask to change to a later flight so you can get your phone.',
      'Talk to the taxi driver. Ask him to keep the phone until you return next week.',
    ],
  },
  {
    title: 'Car Insurance Premium Dispute',
    topic: 'Money & Shopping',
    prompt: 'Your car insurance premium went up by 30% after a minor accident, even though the police report says it was not your fault. Your agent says the claim is still under review, and your policy renews next week.',
    options: [
      'Talk to your insurance agent. Explain why the increase should be removed.',
      'Talk to your spouse. Explain why you want to switch to another insurance company.',
    ],
  },
  {
    title: 'Cabin Rental Mix-Up',
    topic: 'Travel & Transport',
    prompt: 'You rented a lakeside cabin for a family reunion of 12 people. When you arrive, the owner says the booking was entered for 6 people, and the cabin only sleeps 6. A second cabin nearby would cost $400 more.',
    options: [
      'Talk to the owner. Explain why they should give you the second cabin at a discount.',
      'Talk to your family. Explain why some people will stay at a motel in town.',
    ],
  },
  {
    title: 'Class Photo Retake Dispute',
    topic: 'Education & Learning',
    prompt: "You are a school secretary. A parent is upset because their child's eyes are closed in the class photo, and they want the whole class photo retaken. The photographer charges $200 to come back, which the school budget does not cover.",
    options: [
      'Talk to the parent. Explain why the class photo will not be retaken.',
      'Talk to the principal. Explain why the school should pay for a retake.',
    ],
  },
  {
    title: 'Office Equipment Budget Conflict',
    topic: 'Work & Career',
    prompt: 'You are a team lead with $3,000 left in this year\'s budget. Half of your team wants new ergonomic chairs, and the other half wants faster laptops. The money can only cover one.',
    options: [
      'Talk to the team members who want chairs. Explain why the money is going to laptops.',
      'Talk to the team members who want laptops. Explain why the money is going to chairs.',
    ],
  },
  {
    title: 'Living Room Paint Dispute',
    topic: 'Home & Housing',
    prompt: 'While you were away on vacation, your roommate painted the living room bright orange without asking you. Your lease says the walls must be a neutral colour when you move out, or you both lose your deposit.',
    options: [
      'Talk to your roommate. Ask them to repaint the living room.',
      'Talk to your landlord. Ask for permission to keep the new colour.',
    ],
  },
  {
    title: 'Violin Practice Dispute',
    topic: 'Home & Housing',
    prompt: 'Your 12-year-old daughter practises the violin every evening for an important competition next month. Your downstairs neighbour has complained twice about the noise.',
    options: [
      'Talk to your neighbour. Explain why the practice will continue until the competition.',
      'Talk to your daughter. Explain why she needs to practise at school instead.',
    ],
  },
  {
    title: 'Festival Food Vendor Conflict',
    topic: 'Community & Services',
    prompt: 'You are organizing a summer street festival. A long-time local food vendor and a popular new food truck both want the last spot next to the main stage.',
    options: [
      'Talk to the local vendor. Explain why the spot is going to the new food truck.',
      'Talk to the new food truck owner. Explain why the spot is going to the local vendor.',
    ],
  },
  {
    title: 'Broken Leg Press',
    topic: 'Work & Career',
    prompt: 'You work at the front desk of a gym. A member was slightly hurt when the cable on the leg press machine snapped. The machine was reported as broken last week, but maintenance never fixed it, and the member wants to file a formal complaint.',
    options: [
      'Talk to the member. Apologize and explain what the gym will do for them.',
      'Talk to your manager. Explain why the maintenance problem must be fixed now.',
    ],
  },
  {
    title: 'Camp Volunteering Versus Training',
    topic: 'Work & Career',
    prompt: "You promised to volunteer as a counsellor at a children's summer camp for one week. Your employer has just scheduled a required training course for the same week, and you need it to be considered for a promotion.",
    options: [
      'Talk to the camp director. Explain why you cannot volunteer this year.',
      'Talk to your manager. Explain why you want to take the training at a later date.',
    ],
  },
  {
    title: 'Remote Worker Recall',
    topic: 'Work & Career',
    prompt: 'You are a manager. Your company now requires everyone to work in the office three days a week. One of your best employees moved two hours away while working from home and says she will quit if she has to come in.',
    options: [
      'Talk to the employee. Explain why the new rule applies to her too.',
      'Talk to your director. Explain why she should be allowed to keep working from home.',
    ],
  },
  {
    title: 'Park Playground Dispute',
    topic: 'Community & Services',
    prompt: 'You are on your neighbourhood council. The city will build either a new playground or an off-leash dog area in the local park, but not both, and it has asked the council to choose.',
    options: [
      'Talk to the parents\' group. Explain why the park will get a dog area.',
      'Talk to the dog owners\' group. Explain why the park will get a playground.',
    ],
  },
  {
    title: 'Field Trip Permission Dilemma',
    topic: 'Education & Learning',
    prompt: "You are a teacher. One student's permission form for tomorrow's museum field trip has not been signed, and you cannot reach the parents. School rules say students without a signed form must stay behind.",
    options: [
      'Talk to the student. Explain why they cannot go on the trip.',
      'Talk to the principal. Ask to accept permission by email or phone.',
    ],
  },
  {
    title: 'Team Retreat Heights Fear',
    topic: 'Work & Career',
    prompt: 'Your company has planned a team retreat with zip-lining and a treetop ropes course. You have a strong fear of heights, but your manager says taking part is important for team building.',
    options: [
      'Talk to your manager. Explain why you will not take part in the activities.',
      'Talk to the retreat organizer. Suggest an activity that everyone can do on the ground.',
    ],
  },
  {
    title: 'School Nutrition Guidelines Dispute',
    topic: 'Education & Learning',
    prompt: "You are a school principal. New nutrition guidelines ban sugary treats at school, but the parents' council wants to keep its monthly bake sale, which raises about $1,000 a year for the library.",
    options: [
      "Talk to the parents' council. Explain why the bake sale must end.",
      'Talk to the school board. Ask for an exception for the bake sale.',
    ],
  },
  {
    title: 'Wind Farm Wildlife Conflict',
    topic: 'Environment & Nature',
    prompt: 'You are on your town council. A company wants to build a wind farm that would bring clean energy and new jobs, but local birdwatchers say it would be right in the path of migrating birds.',
    options: [
      'Talk to the birdwatching club. Explain why the council will approve the wind farm.',
      'Talk to the energy company. Explain why the wind farm must be built somewhere else.',
    ],
  },
  {
    title: 'Furniture Automation Dispute',
    topic: 'Work & Career',
    prompt: 'You manage a furniture factory. The owner wants to buy sanding robots that would replace five workers, some of whom have worked there for over 20 years.',
    options: [
      'Talk to the owner. Explain why the workers should be retrained instead of let go.',
      'Talk to the workers. Explain why the machines are coming.',
    ],
  },
  {
    title: 'Historic Downtown Redevelopment',
    topic: 'Community & Services',
    prompt: 'You are on city council. A developer wants to replace a 100-year-old downtown building with affordable housing, while a heritage group wants the building protected.',
    options: [
      'Talk to the heritage group. Explain why the council supports the new housing.',
      'Talk to the developer. Explain why the building will be protected.',
    ],
  },
  {
    title: 'Return to Office Mandate',
    topic: 'Work & Career',
    prompt: 'Your employer now requires everyone to work in the office full-time. You have been more productive at home, and your commute would be 90 minutes each way. Another company has offered you a remote job for slightly less pay.',
    options: [
      'Talk to your manager. Explain why you are leaving for the remote job.',
      'Talk to the other company\'s recruiter. Explain why you are turning down the offer.',
    ],
  },
  {
    title: 'Corporate Job Offer',
    topic: 'Work & Career',
    prompt: 'You work at a small non-profit that you love. A large company has offered you a job with 40% higher pay, but your director, who has been your mentor, is counting on you to lead a big project starting next month.',
    options: [
      'Talk to your director. Explain why you are accepting the new job.',
      'Talk to the company\'s recruiter. Explain why you are turning down the offer.',
    ],
  },
  {
    title: 'Weekend Work Request',
    topic: 'Work & Career',
    prompt: 'Your boss has asked you to work on a weekend to finish an urgent project, but you have important family plans.',
    options: [
      'Talk to your boss. Explain why you cannot work this weekend.',
      'Talk to your family. Explain why you have to work this weekend.',
    ],
  },
];
