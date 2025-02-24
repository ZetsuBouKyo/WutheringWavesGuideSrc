<template>
  <div class="d-flex flex-column w-100 mr-8">
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.name" :label="$t('general.name')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.level" :label="$t('general.level')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.chain" :label="$t('general.resonator_chain')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.skill.id" :label="$t('general.resonator_skill_id')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.skill.dmg" :label="$t('general.skill_damage_ratio')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.stat_bonus') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.hp_p" :label="$t('general.hp_p')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.atk_p" :label="$t('general.atk_p')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.def_p" :label="$t('general.def_p')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.crit_rate" :label="$t('general.crit_rate')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.crit_dmg" :label="$t('general.crit_dmg')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_resonance_skill" :label="$t('general.bonus.skill')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_basic_attack" :label="$t('general.bonus.basic')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_heavy_attack" :label="$t('general.bonus.heavy')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_resonance_liberation" :label="$t('general.bonus.liberation')"
        readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_healing" :label="$t('general.bonus.healing')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_physics" :label="$t('general.bonus.physics')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_glacio" :label="$t('general.bonus.glacio')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_fusion" :label="$t('general.bonus.fusion')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_electro" :label="$t('general.bonus.electro')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_aero" :label="$t('general.bonus.aero')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_spectro" :label="$t('general.bonus.spectro')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_havoc" :label="$t('general.bonus.havoc')" readonly>
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useRowResonatorStore from '@/stores/calculation/resonator';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const resonator = useRowResonatorStore(id)
</script>