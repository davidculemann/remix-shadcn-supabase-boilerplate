import { siteConfig } from "@/config/site";

export default function Component() {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<header className="space-y-2">
				<h1 className="text-3xl font-bold">Terms and Conditions</h1>
				<p className="text-sm text-gray-500">Last updated: October 20, 2024</p>
			</header>

			<section className="space-y-4">
				<p>
					These terms and conditions (the "Terms and Conditions") govern the use of
					{siteConfig.url} (the "Site"). This Site is owned and operated by {siteConfig.author}. This Site is
					a boilerplate example.
				</p>
				<p>
					By using this Site, you indicate that you have read and understand these Terms and Conditions and
					agree to abide by them at all times.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Intellectual Property</h2>
				<p>
					All content published and made available on our Site is the property of {siteConfig.author} and the
					Site's creators. This includes, but is not limited to images, text, logos, documents, downloadable
					files and anything that contributes to the composition of our Site.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Acceptable Use</h2>
				<p>
					As a user of our Site, you agree to use our Site legally, not to use our Site for illegal purposes,
					and not to:
				</p>
				<ul className="list-disc pl-6">
					<li>Pass this website and its source code off as your own and/or profit from its distribution.</li>
				</ul>
				<p>
					If we believe you are using our Site illegally or in a manner that violates these Terms and
					Conditions, we reserve the right to limit, suspend or terminate your access to our Site. We also
					reserve the right to take any legal steps necessary to prevent you from accessing our Site.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Accounts</h2>
				<p>When you create an account on our Site, you agree to the following:</p>
				<ol className="list-decimal pl-6 space-y-2">
					<li>
						You are solely responsible for your account and the security and privacy of your account,
						including passwords or sensitive information attached to that account; and
					</li>
					<li>
						All personal information you provide to us through your account is up to date, accurate, and
						truthful and that you will update your personal information if it changes.
					</li>
				</ol>
				<p>
					We reserve the right to suspend or terminate your account if you are using our Site illegally or if
					you violate these Terms and Conditions.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Sale of Goods</h2>
				<p>These Terms and Conditions govern the sale of goods available on our Site.</p>
				<p>The following goods are available on our Site:</p>
				<ul className="list-disc pl-6">
					<li>AI Document Generation.</li>
				</ul>
				<p>
					We are under a legal duty to supply goods that match the description of the goods you order on our
					Site.
				</p>
				<p>
					These Terms and Conditions apply to all the goods that are displayed on our Site at the time you
					access it. This includes all products listed as being out of stock. All information, descriptions,
					or images that we provide about our goods are as accurate as possible. However, we are not legally
					bound by such information, descriptions, or images as we cannot guarantee the accuracy of all goods
					we provide. You agree to purchase goods from our Site at your own risk.
				</p>
				<p>
					We reserve the right to modify, reject or cancel your order whenever it becomes necessary. If we
					cancel your order and have already processed your payment, we will give you a refund equal to the
					amount you paid. You agree that it is your responsibility to monitor your payment instrument to
					verify receipt of any refund.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Subscriptions</h2>
				<p>
					Your subscription automatically renews and you will be automatically billed until we receive
					notification that you want to cancel the subscription.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Free Trial</h2>
				<p>
					We offer the following free trial of our goods: A certain number of tokens are distributed for free
					on signup.
				</p>
				<p>
					At the end of your free trial, the following will occur: You will be notified when your free use
					runs out, you can then follow steps to continue using the product.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Payments</h2>
				<p>We accept the following payment methods on our Site:</p>
				<ul className="list-disc pl-6">
					<li>Debit</li>
				</ul>
				<p>
					When you provide us with your payment information, you authorise our use of and access to the
					payment instrument you have chosen to use. By providing us with your payment information, you
					authorise us to charge the amount due to this payment instrument.
				</p>
				<p>
					If we believe your payment has violated any law or these Terms and Conditions, we reserve the right
					to cancel or reverse your transaction.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Right to Cancel and Receive Reimbursement</h2>
				<p>
					If you are a customer living in the United Kingdom or the European Union you have the right to
					cancel your contract to purchase goods from us within 14 days without giving notice. The
					cancellation period:
				</p>
				<p>
					Will end 14 days from the date of purchase when you purchased digital content that was not supplied
					on a tangible medium.
				</p>
				<p>
					To exercise your right to cancel you must inform us of your decision to cancel within the
					cancellation period. To cancel, contact us by email at davidculemann@gmail.com or by post at 64
					Catharine Street. You may use a copy of the Cancellation Form, found at the end of these Terms and
					Conditions, but you are not required to do so.
				</p>
				<p>The right to cancel does not apply to:</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>
						Goods or services, other than the supply of water, gas, electricity, or district heating, where
						the price depends upon fluctuations in the financial market that we cannot control and that may
						occur during the cancellation period;
					</li>
					<li>Custom or personalised goods;</li>
					<li>Goods that will deteriorate or expire rapidly; and</li>
					<li>Newspapers, magazines, or periodicals, except for subscriptions to such publications.</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Effects of Cancellation</h2>
				<p>
					If you provide express consent to the supply of digital content during the cancellation period and
					acknowledge that your right to cancel the contract is lost by the supply of digital content during
					the cancellation period, you will no longer have a right to cancel the contract.
				</p>
				<p>
					We will make the reimbursement using the same form of payment as you used for the initial purchase
					unless you have expressly agreed otherwise. You will not incur any fees because of the
					reimbursement.
				</p>
				<p>
					This right to cancel and to reimbursement is not affected by any return or refund policy we may
					have.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Consumer Protection Law</h2>
				<p>
					Where the Sale of Goods Act 1979, the Consumer Rights Act 2015, or any other consumer protection
					legislation in your jurisdiction applies and cannot be excluded, these Terms and Conditions will not
					limit your legal rights and remedies under that legislation. These Terms and Conditions will be read
					subject to the mandatory provisions of that legislation. If there is a conflict between these Terms
					and Conditions and that legislation, the mandatory provisions of the legislation will apply.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Limitation of Liability</h2>
				<p>
					{siteConfig.author} and our directors, officers, agents, employees, subsidiaries, and affiliates
					will not be liable for any actions, claims, losses, damages, liabilities and expenses including
					legal fees from your use of the Site.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Indemnity</h2>
				<p>
					Except where prohibited by law, by using this Site you indemnify and hold harmless{" "}
					{siteConfig.author}
					and our directors, officers, agents, employees, subsidiaries, and affiliates from any actions,
					claims, losses, damages, liabilities and expenses including legal fees arising out of your use of
					our Site or your violation of these Terms and Conditions.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Applicable Law</h2>
				<p>These Terms and Conditions are governed by the laws of the Country of England.</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Severability</h2>
				<p>
					If at any time any of the provisions set forth in these Terms and Conditions are found to be
					inconsistent or invalid under applicable laws, those provisions will be deemed void and will be
					removed from these Terms and Conditions. All other provisions will not be affected by the removal
					and the rest of these Terms and Conditions will still be considered valid.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Changes</h2>
				<p>
					These Terms and Conditions may be amended from time to time in order to maintain compliance with the
					law and to reflect any changes to the way we operate our Site and the way we expect users to behave
					on our Site. We will notify users by email of changes to these Terms and Conditions or post a notice
					on our Site.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Contact Details</h2>
				<p>Please contact us if you have any questions or concerns. Our contact details are as follows:</p>
				<ul className="list-none space-y-2">
					<li>07402 099676</li>
					<li>davidculemann@gmail.com</li>
					<li>64 Catharine Street</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Cancellation Form</h2>
				<p>
					If you want to cancel your contract of sale with us you may use this form and email or post it back
					to us at the address below.
				</p>
				<p>To: {siteConfig.url}</p>
				<p>Address: 64 Catharine Street</p>
				<p>Email: davidculemann@gmail.com</p>
				<p>I hereby give notice that I cancel my contract of sale of the following goods or services:</p>
				<ul className="list-none space-y-2">
					<li>Ordered on:</li>
					<li>Received on:</li>
					<li>Customer name:</li>
					<li>Customer address:</li>
					<li>Signature (only required if you are returning a hardcopy of this form):</li>
				</ul>
			</section>
		</div>
	);
}
