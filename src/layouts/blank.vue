<template>
  <!-- centered single-card layout for auth and error pages -->
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="e-blank flex flex-center">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
