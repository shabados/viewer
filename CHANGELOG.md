# Unreleased (2021-10-25)



# [1.5.0](https://github.com/ShabadOS/viewer/compare/v1.5.0-next.1...v1.5.0) (2021-10-25)



# [1.5.0-next.1](https://github.com/ShabadOS/viewer/compare/v1.5.0-next.0...v1.5.0-next.1) (2021-10-25)



# [1.5.0-next.0](https://github.com/ShabadOS/viewer/compare/v1.4.3-next.2...v1.5.0-next.0) (2021-10-25)


### Features

* **frontend:** render the version via build environment variable ([78a13c9](https://github.com/ShabadOS/viewer/commit/78a13c90ccee54abfff5cb19aafa1d90b72d976d))



## [1.4.3-next.2](https://github.com/ShabadOS/viewer/compare/v1.4.3-next.1...v1.4.3-next.2) (2021-10-25)



## [1.4.3-next.1](https://github.com/ShabadOS/viewer/compare/v1.4.3-next.0...v1.4.3-next.1) (2021-10-25)



## [1.4.1](https://github.com/ShabadOS/viewer/compare/v1.4.0...v1.4.1) (2021-10-18)



# [1.4.0](https://github.com/ShabadOS/viewer/compare/6b455406f8a89094413c21f17f831144a44c3e2b...v1.4.0) (2021-10-15)


### Bug Fixes

* **backend:** add resilience to auto-updater crashing ([122fbaa](https://github.com/ShabadOS/viewer/commit/122fbaa9eab824a7e4d8b8305d38895ad0516f71))
* **backend:** add resilience to auto-updater crashing ([e3f3170](https://github.com/ShabadOS/viewer/commit/e3f3170a977ca9ad8408d4ba5972e50d4c6c62fb))
* **backend:** remove cors and mount api at / ([8dc68f5](https://github.com/ShabadOS/viewer/commit/8dc68f5fe0634b1cc42f2dd6ce604873cc1ad047))
* **backend:** return correct line for line index ([b034e47](https://github.com/ShabadOS/viewer/commit/b034e4771deea4387be13b4ce5cf2447fb19af2d))
* **frontend:** add correct events for mobile slider tooltips ([2d6cbd6](https://github.com/ShabadOS/viewer/commit/2d6cbd650e352e2b76ec69fd66f242ab783dba33)), closes [#67](https://github.com/ShabadOS/viewer/issues/67)
* **frontend:** add missing dependencies to useEffect ([3aba0f4](https://github.com/ShabadOS/viewer/commit/3aba0f4ed4a25675ffc2ebe662555a654223e551))
* **frontend:** add right margin to each line ([cf0161b](https://github.com/ShabadOS/viewer/commit/cf0161bf7ef5d660105de22d023ec5fe6edcc315))
* **frontend:** allow holding down a registered react hotkey ([5110fd4](https://github.com/ShabadOS/viewer/commit/5110fd42e7f0589f2d0fe1c2df7d16968da40dba))
* **frontend:** change bottom page padding to margin to avoid unnecessary scrollbar ([7a249d8](https://github.com/ShabadOS/viewer/commit/7a249d8259699d7f49a9188b7586b0cc4a429b2f))
* **frontend:** change next page and previous page hotkeys ([ce8b8e7](https://github.com/ShabadOS/viewer/commit/ce8b8e7ef41e21c719ff91b7b7e7ec7b89272f55)), closes [#20](https://github.com/ShabadOS/viewer/issues/20)
* **frontend:** correct condition used to center loader/error ([22b3fad](https://github.com/ShabadOS/viewer/commit/22b3fadb7607e95a72544804b59949eb78655825))
* **frontend:** do not render line view if there is no gurmukhi ([add6386](https://github.com/ShabadOS/viewer/commit/add6386f87586e708d961012ecbeaac299d31456))
* **frontend:** ensure getPositions always returns an object ([1bbec8d](https://github.com/ShabadOS/viewer/commit/1bbec8dd94fb3c4b9e823ba88ad45d5301c3ba4c))
* **frontend:** fix backwards and forwards arrows ([a8e0152](https://github.com/ShabadOS/viewer/commit/a8e0152853f1bcff342f9895064bb257fcd34b71))
* **frontend:** fix scrolling weirdness on navigation to new page ([f3f7128](https://github.com/ShabadOS/viewer/commit/f3f71282777174c73e706c0c51df4ddd3abb55a6)), closes [#30](https://github.com/ShabadOS/viewer/issues/30)
* **frontend:** improve reliability of up arrow hotkey ([50ca059](https://github.com/ShabadOS/viewer/commit/50ca0599b59367e4cc60caf02f6c8654b1a9fa21))
* **frontend:** increase font size on smaller screens ([cad9129](https://github.com/ShabadOS/viewer/commit/cad912927d472e775f2e0dbe8f64b420a249b5b7))
* **frontend:** only replace history on navigation ([12926ce](https://github.com/ShabadOS/viewer/commit/12926ce71103d44558423651134e9cfcaee86421))
* **frontend:** prevent up and down from attempting to navigate to no adjacent line ([bb8f52b](https://github.com/ShabadOS/viewer/commit/bb8f52bc30951da1bdeaf3480f0adef0bc18cd98))
* **frontend:** restore browser behaviour for up and down arrows ([2ffbfc4](https://github.com/ShabadOS/viewer/commit/2ffbfc4f0948013ad6dcd1d6bfc3c3f3e1becdae))
* **frontend:** temporarily remove up and down hotkeys ([41b1e81](https://github.com/ShabadOS/viewer/commit/41b1e81da21bbc9e0f2e993a55306e965255bfe7)), closes [#74](https://github.com/ShabadOS/viewer/issues/74)
* **frontend:** type cast url parameters to numbers ([9573481](https://github.com/ShabadOS/viewer/commit/957348112e3f04dabeffbee3d7509d55442c7c9e))
* **frontend:** update issue templateFixes [#66](https://github.com/ShabadOS/viewer/issues/66) ([4c384c2](https://github.com/ShabadOS/viewer/commit/4c384c2890f1cb0b477b1fa7a35c4d57797e1ded))
* **frontend:** use correct props in openIssue() ([6054bb2](https://github.com/ShabadOS/viewer/commit/6054bb2f9f6ab3a7f59ebe8e52fb1286811e0c8b))


### Features

* add additional information of translations to line view ([90efaa2](https://github.com/ShabadOS/viewer/commit/90efaa20f865d02a62e117bc39e10518e497f091))
* add Google Translate integration to translations ([#305](https://github.com/ShabadOS/viewer/issues/305)) ([ccd9d12](https://github.com/ShabadOS/viewer/commit/ccd9d123d7ecaf230951cb42f49e083929ade795))
* add preliminary line + translation view ([3d5414a](https://github.com/ShabadOS/viewer/commit/3d5414a5680f273fa43cc8033cc6a71dda374a22))
* add support for accessing line via /line/:lineId ([d17a577](https://github.com/ShabadOS/viewer/commit/d17a577bf8fbb1f5c8f5baed281af938092693fe))
* add syllablic forms and counts for lines ([#322](https://github.com/ShabadOS/viewer/issues/322)) ([92345ed](https://github.com/ShabadOS/viewer/commit/92345ed652dc9525abc2f3ee06c357bddc508a18))
* **backend:** add database auto-updates ([c7ff813](https://github.com/ShabadOS/viewer/commit/c7ff813b9292d2b7fb0842401bbed46e0264e195))
* **backend:** add endpoint to get lines on page ([43f9f0e](https://github.com/ShabadOS/viewer/commit/43f9f0e061909950f64bf1162893dc49cb3765ee))
* **backend:** add endpoint to retrieve sources ([ae684b7](https://github.com/ShabadOS/viewer/commit/ae684b7934eea0de670a4cb6daadb6d4505393ef))
* **backend:** improve error logging ([594ea46](https://github.com/ShabadOS/viewer/commit/594ea46d0e653a996022141ee051919a83799913))
* **backend:** only return sources with content ([3bc1525](https://github.com/ShabadOS/viewer/commit/3bc1525bf228387c330e5bb99956de84d68cb1fc)), closes [#34](https://github.com/ShabadOS/viewer/issues/34)
* **backend:** start basic http server ([6b45540](https://github.com/ShabadOS/viewer/commit/6b455406f8a89094413c21f17f831144a44c3e2b))
* center/scroll viewport on active/focus line ([#321](https://github.com/ShabadOS/viewer/issues/321)) ([1506a8f](https://github.com/ShabadOS/viewer/commit/1506a8f30a5f12de711afbbcce2e5c03312a0634))
* clicking a line should take user to line viewer page ([1d81495](https://github.com/ShabadOS/viewer/commit/1d8149563619138ae4bd15cd56378a2abbfed421))
* **frontend:** add automatictooltip when navigating pages ([3c6090f](https://github.com/ShabadOS/viewer/commit/3c6090fbf6db6022c56da3b6fa59e319a998fe95)), closes [#20](https://github.com/ShabadOS/viewer/issues/20)
* **frontend:** add basic hotkeys and persistent focusRelated to [#20](https://github.com/ShabadOS/viewer/issues/20), part of [#23](https://github.com/ShabadOS/viewer/issues/23) ([09bf278](https://github.com/ShabadOS/viewer/commit/09bf2782257445f09c03bec919c0b8372f49d879))
* **frontend:** add basic source view page ([0c21a8f](https://github.com/ShabadOS/viewer/commit/0c21a8f1119b091dfdcc9e26222015552e5a6e06))
* **frontend:** add click on line to link to GitHub issue ([805b190](https://github.com/ShabadOS/viewer/commit/805b19094ff77977bc4353b4ca56ea4acc152301)), closes [#6](https://github.com/ShabadOS/viewer/issues/6)
* **frontend:** add ctrl+home and ctrl+end hotkeys to navaigate to first and lage page ([de2e4e0](https://github.com/ShabadOS/viewer/commit/de2e4e01b3a1dc4fa67ee90af65aef195ff483d5))
* **frontend:** add dev-only proxying to backend ([adce989](https://github.com/ShabadOS/viewer/commit/adce989b2db7d3296ef997c07a4d2f07f313e30d))
* **frontend:** add Error component for failures ([b45fe1f](https://github.com/ShabadOS/viewer/commit/b45fe1f90e2977b197efa2ced6415648e9facadb))
* **frontend:** add example to github template ([84b84f7](https://github.com/ShabadOS/viewer/commit/84b84f767286499250bd3861408f76ad3d5944ee))
* **frontend:** add expansion panel to translation blocks ([bac0d17](https://github.com/ShabadOS/viewer/commit/bac0d179c7636f0a77ddf12194e51f6dd6c8a2da))
* **frontend:** add fade transitions between pages ([7850fad](https://github.com/ShabadOS/viewer/commit/7850fad70eb7ea9d414a04bf86d91e7ef60e6872)), closes [#30](https://github.com/ShabadOS/viewer/issues/30)
* **frontend:** add favicons ([2e6ce57](https://github.com/ShabadOS/viewer/commit/2e6ce57c65ea39eb1c4f49ec949217e78cd30db4))
* **frontend:** add introduction ([9ee4e26](https://github.com/ShabadOS/viewer/commit/9ee4e265d3afe95bc69a3d4609b27606622a15d0))
* **frontend:** add line view navigation hotkeys with debounce ([130e3da](https://github.com/ShabadOS/viewer/commit/130e3da6fbbfa07cb00f1b1dc8e64487c95d5d05))
* **frontend:** add links to homepage ([eea2f2f](https://github.com/ShabadOS/viewer/commit/eea2f2ffaa7119cc67f67ec16a22321850e408e6))
* **frontend:** add page slider ([e1c7175](https://github.com/ShabadOS/viewer/commit/e1c71759452675c7be6e8980fa8699a4564aeed0))
* **frontend:** add source as a label to open issues ([5996a64](https://github.com/ShabadOS/viewer/commit/5996a6410d7963b6fef9728a5b79e02493ec8eac))
* **frontend:** add source selection ([9cbdc0b](https://github.com/ShabadOS/viewer/commit/9cbdc0b3605b38e9a50c8a261469b97e4d6a1352)), closes [#4](https://github.com/ShabadOS/viewer/issues/4)
* **frontend:** add submit correction and menu to line view ([33e561a](https://github.com/ShabadOS/viewer/commit/33e561af1cafac0f13a1edff0af887d0b50f472f))
* **frontend:** add support for connecting from other hosts ([fdee479](https://github.com/ShabadOS/viewer/commit/fdee4792a9e805d33df7ef92b25907ba70007919))
* **frontend:** add theme colors for mobile apps ([2e62bd9](https://github.com/ShabadOS/viewer/commit/2e62bd9e8755c48eda0e7f7347d38d465da6201d))
* **frontend:** add theme colors for mobile apps ([5a9fb01](https://github.com/ShabadOS/viewer/commit/5a9fb016732a9d66eef9dc5b638a7f9a65358af4))
* **frontend:** add up and down hotkeys ([ab10343](https://github.com/ShabadOS/viewer/commit/ab10343869a31e576494c2040f59858c39912c92))
* **frontend:** add word linking to Sri Granth dictionary ([4dd4816](https://github.com/ShabadOS/viewer/commit/4dd48167cc27b423d1a8ea652dd7252d062e4717))
* **frontend:** change ordering of translations ([8771ad1](https://github.com/ShabadOS/viewer/commit/8771ad1c835622a70900883a9f5f85d3fa2fb5c5))
* **frontend:** convert source number to human readable text ([c168a24](https://github.com/ShabadOS/viewer/commit/c168a24f2cda3fef4613573cbbe1b9d78d38f816))
* **frontend:** distinguish internal and external link colors ([cdd2247](https://github.com/ShabadOS/viewer/commit/cdd224781fc60309fd20f1b12e6d8805478fcffd))
* **frontend:** grey out navigation controls if single page source ([44c5bbe](https://github.com/ShabadOS/viewer/commit/44c5bbea5d9657136caaaf76796993748d6b9ef9)), closes [#69](https://github.com/ShabadOS/viewer/issues/69) [#57](https://github.com/ShabadOS/viewer/issues/57)
* **frontend:** implement page navigation ([83ee7cf](https://github.com/ShabadOS/viewer/commit/83ee7cf089beee0fd4dbab6177c56c3f4f12d918)), closes [#5](https://github.com/ShabadOS/viewer/issues/5)
* **frontend:** improved copying of issue template ([bce2d27](https://github.com/ShabadOS/viewer/commit/bce2d274fc3f925581b535d80f3406793155e2f8))
* **frontend:** initialise create-react-app ([4a302ed](https://github.com/ShabadOS/viewer/commit/4a302ed70421dfe0c2ee9b7533581da66de9d2be))
* **frontend:** keep track of last page and line viewed ([037f77a](https://github.com/ShabadOS/viewer/commit/037f77ad3a8e9bd0f46843863d7c94ca5cc6a87e)), closes [#14](https://github.com/ShabadOS/viewer/issues/14)
* **frontend:** load page lines ([a1225b4](https://github.com/ShabadOS/viewer/commit/a1225b48ea5bbd0c2dcdbe3899a8d3fc11367e4c)), closes [#5](https://github.com/ShabadOS/viewer/issues/5) [#6](https://github.com/ShabadOS/viewer/issues/6)
* **frontend:** scroll to top of page on navigation ([667921c](https://github.com/ShabadOS/viewer/commit/667921c5889e40fe541685496c767767e61f8f8e)), closes [#30](https://github.com/ShabadOS/viewer/issues/30)
* **frontend:** scroll viewed line into center ([4d05634](https://github.com/ShabadOS/viewer/commit/4d05634d40cfa3067483f01e142ffc2ef8820f82)), closes [#23](https://github.com/ShabadOS/viewer/issues/23)
* **frontend:** set focused line when clicked ([f2a87d8](https://github.com/ShabadOS/viewer/commit/f2a87d8e82d4cbb510c93d36eac4dc065a32a976))
* **frontend:** setup nested route ([15c31e3](https://github.com/ShabadOS/viewer/commit/15c31e3741a3b4d54e88298b73d7623e030ae0a3))
* **frontend:** show version number on homepage ([833a32c](https://github.com/ShabadOS/viewer/commit/833a32c8dc2ed15476e1cec7930312759a224d2c))
* **frontend:** signify links with underline in line view ([19c09fc](https://github.com/ShabadOS/viewer/commit/19c09fc0c57f8e9328dc322635364e99e9969087))
* **frontend:** signify toggling of translation blocks in line view ([b8b47ef](https://github.com/ShabadOS/viewer/commit/b8b47efa6b4a82e564e9275e0a104cccd1ebd4bc))
* **frontend:** update issue template URL to use new line referencing format ([0dad515](https://github.com/ShabadOS/viewer/commit/0dad515ffda1e8ec69a15e6d6e9aa31f436abc33))
* get a line given an id ([d696b5e](https://github.com/ShabadOS/viewer/commit/d696b5e79ece62f19d014d71fd084134f6ccf2e9))
* improve GitHub report workflow ([#319](https://github.com/ShabadOS/viewer/issues/319)) ([39e6c8b](https://github.com/ShabadOS/viewer/commit/39e6c8ba8c9ad48e5b44307fb246280c66f26ff0))
* **proofs:** Add Sri Dasam Granth Steek proof ([a6e335c](https://github.com/ShabadOS/viewer/commit/a6e335c0a0509eda25935ff471c7150e90044716))
* **proofs:** Add Sri Dasam Granth Steek proof ([5477bcd](https://github.com/ShabadOS/viewer/commit/5477bcdcce912646726778b2366a9663fb9d8710))
* setup line viewer page ([d98cfcf](https://github.com/ShabadOS/viewer/commit/d98cfcfb7eb3ac9ddcba5f600a2f559f719a5e00))
* update logo ([#320](https://github.com/ShabadOS/viewer/issues/320)) ([e4405fe](https://github.com/ShabadOS/viewer/commit/e4405fe3e778c3753b396c57088ec36046f1f87d))



