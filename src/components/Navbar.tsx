"use server";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import Image from "next/image";

import {
	CalendarIcon,
	EnvelopeClosedIcon,
	HeartIcon,
} from "@radix-ui/react-icons";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { MagnifyingGlassIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ModeToggle";

import { Input } from "@/components/ui/input";

export default async function Navbar() {
	return (
		<nav>
			<div className="flex relative flex-row place-content-between mt-4 sm:mx-4 mb-6 p-4">
				<div className="flex flex-row gap-4">
					<Link href="/" legacyBehavior passHref>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							className="dark:invert cursor-pointer"
							width={100}
							height={24}
							priority
						/>
					</Link>
				</div>
				<div className="flex gap-2">
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
