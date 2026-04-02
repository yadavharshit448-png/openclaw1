import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { theme } from './src/theme';
import {
  checklist,
  features,
  privacyNotes,
  riskInbox,
  screens,
  summaryStats,
  timeline,
  vendors,
  type RiskItem,
  type WindowKey,
} from './src/data/features';

const filters: { key: WindowKey; label: string; maxDays: number }[] = [
  { key: '7d', label: 'Next 7d', maxDays: 7 },
  { key: '30d', label: 'Next 30d', maxDays: 30 },
  { key: '90d', label: 'Next 90d', maxDays: 90 },
];

const riskColors: Record<RiskItem['risk'], string> = {
  high: theme.colors.danger,
  medium: theme.colors.warning,
  low: theme.colors.success,
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState<WindowKey>('30d');

  const visibleRisks = useMemo(() => {
    const selected = filters.find((item) => item.key === activeFilter) ?? filters[1];
    return riskInbox.filter((item) => item.dueInDays <= selected.maxDays);
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ExpoStatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>ANDROID AUTOPILOT MVP</Text>
          <Text style={styles.title}>Deprecation Radar</Text>
          <Text style={styles.tagline}>
            Track API, SDK, and vendor change risk before it breaks your product.
          </Text>
          <View style={styles.statRow}>
            {summaryStats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Command Center</Text>
          <Text style={styles.body}>
            Sample local dashboard for founders and lean dev teams tracking deprecations,
            deadline pressure, and migration work without needing backend setup first.
          </Text>
          <View style={styles.filterRow}>
            {filters.map((filter) => {
              const active = filter.key === activeFilter;
              return (
                <Pressable
                  key={filter.key}
                  onPress={() => setActiveFilter(filter.key)}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                >
                  <Text style={[styles.filterText, active && styles.filterTextActive]}>
                    {filter.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.gapMd}>
            {visibleRisks.map((item) => (
              <View key={item.id} style={styles.riskCard}>
                <View style={styles.riskHeader}>
                  <View style={[styles.riskDot, { backgroundColor: riskColors[item.risk] }]} />
                  <Text style={styles.riskDue}>{item.dueLabel}</Text>
                </View>
                <Text style={styles.riskTitle}>{item.title}</Text>
                <Text style={styles.riskMeta}>{item.vendor}</Text>
                <Text style={styles.riskAction}>Next action: {item.action}</Text>
              </View>
            ))}
            {visibleRisks.length === 0 ? (
              <Text style={styles.emptyText}>No risks in this window. Good time to clean up backlog notes.</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Vendor Watchlist</Text>
          {vendors.map((vendor) => (
            <View key={vendor.id} style={styles.vendorCard}>
              <View style={styles.vendorHeader}>
                <View>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <Text style={styles.vendorMeta}>
                    {vendor.category} · Owner: {vendor.owner}
                  </Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{vendor.criticality}</Text>
                </View>
              </View>
              <Text style={styles.body}>{vendor.item}</Text>
              <Text style={styles.vendorMeta}>Due in {vendor.dueInDays} days</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.round(vendor.progress * 100)}%` }]} />
              </View>
              <Text style={styles.progressLabel}>
                Migration progress {Math.round(vendor.progress * 100)}% · Links: {vendor.links.join(' • ')}
              </Text>
              <Text style={styles.noteText}>{vendor.note}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Timeline & Notes</Text>
          {timeline.map((item) => (
            <View key={item} style={styles.row}>
              <View style={styles.dot} />
              <Text style={[styles.body, styles.rowText]}>{item}</Text>
            </View>
          ))}
          <View style={styles.callout}>
            <Text style={styles.calloutTitle}>JSON handoff</Text>
            <Text style={styles.body}>
              Keep export/import offline-first for v1. Later connect AsyncStorage or sync only after
              privacy review and clear deletion controls.
            </Text>
          </View>
          {checklist.map((item) => (
            <View key={item} style={styles.row}>
              <View style={[styles.dot, styles.successDot]} />
              <Text style={[styles.body, styles.rowText]}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>V1 scope</Text>
          {features.map((feature) => (
            <View key={feature} style={styles.row}>
              <View style={styles.dot} />
              <Text style={[styles.body, styles.rowText]}>{feature}</Text>
            </View>
          ))}
          <Text style={styles.sectionTitle}>Core screens</Text>
          {screens.map((screen) => (
            <View key={screen.title} style={styles.screenCard}>
              <Text style={styles.screenTitle}>{screen.title}</Text>
              <Text style={styles.body}>{screen.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Privacy notes</Text>
          {privacyNotes.map((note) => (
            <View key={note} style={styles.row}>
              <View style={[styles.dot, styles.warningDot]} />
              <Text style={[styles.body, styles.rowText]}>{note}</Text>
            </View>
          ))}
          <Text style={styles.todo}>
            TODO: add persistent local storage, notifications, and import/export flows when implementation
            scope expands.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.md, gap: theme.spacing.md, paddingBottom: 40 },
  heroCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  eyebrow: { color: theme.colors.accentSoft, fontSize: 12, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: theme.colors.text, fontSize: 30, fontWeight: '800' },
  tagline: { color: theme.colors.muted, fontSize: 16, lineHeight: 24 },
  statRow: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statValue: { color: theme.colors.text, fontSize: 22, fontWeight: '800' },
  statLabel: { color: theme.colors.muted, fontSize: 12, marginTop: 4 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sectionTitle: { color: theme.colors.text, fontSize: 19, fontWeight: '800' },
  body: { color: theme.colors.muted, fontSize: 14, lineHeight: 21 },
  filterRow: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.xs },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.chip,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  filterText: { color: theme.colors.muted, fontSize: 13, fontWeight: '700' },
  filterTextActive: { color: theme.colors.text },
  gapMd: { gap: theme.spacing.sm },
  riskCard: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  riskHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  riskDot: { width: 10, height: 10, borderRadius: 99 },
  riskDue: { color: theme.colors.text, fontSize: 12, fontWeight: '700' },
  riskTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700', lineHeight: 22 },
  riskMeta: { color: theme.colors.muted, fontSize: 12 },
  riskAction: { color: theme.colors.accentSoft, fontSize: 13, lineHeight: 19 },
  emptyText: { color: theme.colors.muted, fontSize: 13 },
  vendorCard: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 8,
  },
  vendorHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  vendorName: { color: theme.colors.text, fontSize: 16, fontWeight: '800' },
  vendorMeta: { color: theme.colors.muted, fontSize: 12 },
  badge: {
    backgroundColor: theme.colors.chip,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  badgeText: { color: theme.colors.accentSoft, fontSize: 12, fontWeight: '700' },
  progressTrack: {
    height: 8,
    backgroundColor: '#0f1730',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: 999,
  },
  progressLabel: { color: theme.colors.muted, fontSize: 12 },
  noteText: { color: theme.colors.text, fontSize: 13, lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  rowText: { flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 999, backgroundColor: theme.colors.accent, marginTop: 5 },
  successDot: { backgroundColor: theme.colors.success },
  warningDot: { backgroundColor: theme.colors.warning },
  callout: {
    backgroundColor: '#0f1730',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
    marginVertical: 6,
  },
  calloutTitle: { color: theme.colors.text, fontSize: 15, fontWeight: '800' },
  screenCard: {
    backgroundColor: '#0f1730',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  screenTitle: { color: theme.colors.text, fontSize: 15, fontWeight: '800' },
  todo: { color: theme.colors.warning, fontSize: 13, lineHeight: 19 },
});
