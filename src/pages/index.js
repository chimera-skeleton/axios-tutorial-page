import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function Index() {
	return (
		<Fragment>
			<main class="main-wrapper">
				<div class="title">
					<h2>Promise based HTTP client for the browser and node.js </h2>
				</div>
				<div class="center">
					<Image
						className="svg"
						src="/Axiostitle.svg"
						width={188}
						height={28}
						color="white"
					>
					</Image>
				</div>
				<div class="card-wrapper">
					<Link href="posts/adapters" className="card">
						<h2>
							Adapters <span>-&gt;</span>
						</h2>
						<p>Handle dispatching a request Setting returned a Promise</p>
					</Link>
					<Link href="posts/cancel" className="card">
						<h2>
							Cancel <span>-&gt;</span>
						</h2>
						<p>Cancel requests</p>
					</Link>
					<Link href="posts/core" className="card">
						<h2>
							Core <span>-&gt;</span>
						</h2>
						<p>Dispatching requests Managing interceptor Handing config</p>
					</Link>
					<Link href="posts/defaults" className="card">
						<h2>
							Defaults <span>-&gt;</span>
						</h2>
						<p>Default config</p>
					</Link>
				</div>
			</main>
		</Fragment>
	)
}
