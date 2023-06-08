# talkifyfun 🚀

A platform that allows users to create and share virtual rooms for seamless video calls.

With TalkifyFun, users can easily set up their rooms, which can be shared with others. This allows for effortless collaboration, communication in real-time.

I've built this app to participate in hackaton organized by Twilio and 👨‍💻 [midudev](https://twitch.tv/midudev)

With talkifyfun you can:

- Create multiple rooms.
- Share your room's code with other participants.
- See you recent activities.
- And more...

# Stack 🚀

- **Development**: React + Typescript
- **Styles**: [Chakra UI](https://chakra-ui.com/guides/first-steps)
- **Database and authentication**: [Supabase](https://supabase.com/)
- **Deployment**: [Vercel](https://vercel.com)

# Setting up 🔑

## Supabase - Project API Keys

1. Sign In on Supabase
2. Go to settings option on sidebar
3. Select API option on project settings block
4. Copy 'anon public' and 'URL'

# Final Steps ✅

1. Clone this repo to a directory and then run `npm install`
2. Set-up your environment variables following the `.env.example` file.
  - You can get the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` following **Supabase - Project API Keys**
3. Set-up your environment variable following the `.env.example` file. 
  - You can follow this [guide of Twilio](https://www.twilio.com/docs/glossary/what-is-an-api-key) to set 
  `ACCOUNT_SID`, `API_KEY_SID` and `API_KEY_SECRET`
4. Run `npm run dev` to start developing mode.
