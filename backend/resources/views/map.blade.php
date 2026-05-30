<x-layout>
    @stack('head')
    @push('head')
        @viteReactRefresh
        @vite('resources/js/map.jsx')
    @endpush

    <!-- React App Mount Point -->
    <div id="coverage-map-root"></div>
</x-layout>
