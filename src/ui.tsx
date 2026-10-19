import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export const colors = {
  background: '#F5F6FA',
  surface: '#FFFFFF',
  primary: '#5265E8',
  primaryDark: '#394BC5',
  primarySoft: '#EAEDFF',
  ink: '#1D2540',
  secondary: '#66708A',
  muted: '#969EB1',
  border: '#E8EAF1',
  green: '#2A9D78',
  greenSoft: '#E6F6EF',
  orange: '#DF8B3C',
  orangeSoft: '#FFF2E2',
  red: '#D65C67',
  redSoft: '#FDECEF',
};

export function Label({
  children,
  style,
}: React.PropsWithChildren<{ style?: TextStyle }>) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

export function Card({
  children,
  style,
}: React.PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Pill({
  children,
  tone = 'primary',
}: React.PropsWithChildren<{ tone?: 'primary' | 'green' | 'orange' | 'red' }>) {
  const toneStyle = {
    primary: styles.primaryPill,
    green: styles.greenPill,
    orange: styles.orangePill,
    red: styles.redPill,
  }[tone];
  const textStyle = {
    primary: styles.primaryPillText,
    green: styles.greenPillText,
    orange: styles.orangePillText,
    red: styles.redPillText,
  }[tone];
  return (
    <View style={[styles.pill, toneStyle]}>
      <Text style={[styles.pillText, textStyle]}>{children}</Text>
    </View>
  );
}

export function ActionButton({
  title,
  onPress,
  secondary = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.action, secondary && styles.actionSecondary]}
    >
      <Text
        style={[styles.actionText, secondary && styles.actionTextSecondary]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export const commonStyles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  row: { flexDirection: 'row', alignItems: 'center' },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 25, lineHeight: 31, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: 13, lineHeight: 19, color: colors.secondary },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.ink },
  small: { fontSize: 12, color: colors.secondary },
  back: { fontSize: 14, color: colors.primary, fontWeight: '700' },
  headingBlock: { marginBottom: 20, gap: 4 },
  divider: { height: 1, backgroundColor: colors.border },
  empty: { alignItems: 'center', paddingVertical: 34, paddingHorizontal: 20 },
  emptyIcon: { fontSize: 34, marginBottom: 8 },
  emptyTitle: { fontSize: 15, color: colors.ink, fontWeight: '700' },
  emptyText: {
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 5,
  },
});

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFF0F5',
    shadowColor: '#29335F',
    shadowOpacity: 0.035,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },
  pillText: { fontSize: 10, fontWeight: '700' },
  primaryPill: { backgroundColor: colors.primarySoft },
  primaryPillText: { color: colors.primary },
  greenPill: { backgroundColor: colors.greenSoft },
  greenPillText: { color: colors.green },
  orangePill: { backgroundColor: colors.orangeSoft },
  orangePillText: { color: colors.orange },
  redPill: { backgroundColor: colors.redSoft },
  redPillText: { color: colors.red },
  action: {
    backgroundColor: colors.primary,
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSecondary: { backgroundColor: colors.primarySoft },
  actionText: { fontSize: 14, color: '#FFFFFF', fontWeight: '700' },
  actionTextSecondary: { color: colors.primary },
});
