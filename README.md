# iwannaknowyu 🚀

**iwannaknowyu.app** is a social media app to know people around the world.

Besides, I've build this app to participate in hackaton organized by 👨‍💻 [midudev](https://twitch.tv/midudev)

# Stack ❤️

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

## Queries

I haven't created the migrations to deploy all the tables to database. However, I will generate a script to generate the tables and policies.

# Final Steps ✅

1. Clone this repo to a directory and then run `npm install`
2. Set-up your environment variables following the `.env.example` file.
  - You can get the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` following **Supabase - Project API Keys**
3. Set-up your environment variable following the `.env.example` file. 
  - You can follow this [guide of Twilio](https://www.twilio.com/docs/glossary/what-is-an-api-key) to set 
  `ACCOUNT_SID`, `API_KEY_SID` and `API_KEY_SECRET`
4. Run `npm run dev` to start developing mode.