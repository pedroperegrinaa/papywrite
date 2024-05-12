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
					{/* <Sheet>
						<SheetTrigger asChild className="lg:hidden block">
							<Button variant="outline">
								<HamburgerMenuIcon />
							</Button>
						</SheetTrigger>
						<SheetContent side={'left'}>
							<ProductCategories
								isOnDrawer={true}
								categories={categoriesSorted}
								categorySearched={categorySearched as string}
							/>
						</SheetContent>
					</Sheet> */}
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
					<Drawer>
						<DrawerTrigger asChild>
							<Button
								variant={"link"}
								className="hover:text-[#5143F1] lg:hidden flex"
							>
								<CalendarIcon className="mr-2" />
								Links
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<div className="mx-auto w-full max-w-7xl px-8 lg:px-32">
								<div className="flex w-full gap-3 mb-6 flex-col sm:flex-row text-center">
									<Link href="https://linktr.ee/yoobe">
										<Button variant={"link"} className="hover:text-[#5143F1]">
											<EnvelopeClosedIcon className="mr-2" />
											Contato
										</Button>
									</Link>
									<Link href="https://calendly.com/yoobeco/demo?month=2024-04">
										<Button variant={"link"} className="hover:text-[#5143F1]">
											<CalendarIcon className="mr-2" />
											Agende uma demo
										</Button>
									</Link>
									<Link href="http://yoobe.co/">
										<Button variant={"link"} className="hover:text-[#5143F1]">
											<HeartIcon className="mr-2" />
											Conheça a Yoobe
										</Button>
									</Link>
								</div>
							</div>
						</DrawerContent>
					</Drawer>
				</div>

				<div className="flex gap-2">
					{/* <Link className="lg:block hidden" href="https://linktr.ee/yoobe">
						<Button variant={'link'} className="hover:text-[#5143F1]">
							<EnvelopeClosedIcon className="mr-2" />
							Contato
						</Button>
					</Link> */}

					{/* <Input className='lg:block hidden bg-[#F5F5F5]' placeholder='Buscar conteúdo'/> */}

					<Link href="/sign-in">
						<Button variant="outline">Sign In</Button>
					</Link>
					<ModeToggle />
					{/* <CartButton /> */}
				</div>
			</div>
		</nav>
	);
}
