<script>
	// @ts-nocheck

	import { checkTranslation, translate } from "./lang";
	import Settings from "./Settings";
	/**
	 * @type {HTMLSpanElement}
	 */
	let source;
	let dest;
	let text;
	$: if (source) text = $translate(source?.innerText);
	$: if ($Settings.debug_translations) {
		if (dest && source)
			if (!$checkTranslation(source?.innerText)) {
				dest.style.setProperty("color", "red");
			} else {
				dest.style.setProperty("color", "unset");
			}
	}
</script>

<span bind:this={dest}>{text}</span><span
	style="display: none"
	bind:this={source}
	on:DOMSubtreeModified={() => (text = $translate(source?.innerText))}
>
	<slot />
</span>
