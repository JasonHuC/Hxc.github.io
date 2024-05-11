import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {PrismaAdapter} from "@auth/prisma-adapter";
import {NODE_ENV} from "@/config/env";
import {PATHS} from "@/constants";
import {prisma} from './prisma'


export const { handlers, auth } = NextAuth({
    providers: [GithubProvider],
})
