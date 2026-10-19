import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StudyProvider } from './src/StudyContext';
import { colors } from './src/ui';
import {
  AssignmentDetailScreen,
  AssignmentsScreen,
  CourseDetailScreen,
  CoursesScreen,
  GradeDetailScreen,
  HomeScreen,
  ProfileScreen,
  ScheduleScreen,
  SessionDetailScreen,
} from './src/screens';
import { StudyStackParamList, TabParamList } from './src/types';

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<StudyStackParamList>();
const CoursesStack = createNativeStackNavigator<StudyStackParamList>();
const ScheduleStack = createNativeStackNavigator<StudyStackParamList>();
const AssignmentsStack = createNativeStackNavigator<StudyStackParamList>();
const ProfileStack = createNativeStackNavigator<StudyStackParamList>();

const stackOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};

function HomeFlow() {
  return (
    <HomeStack.Navigator screenOptions={stackOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <HomeStack.Screen
        name="AssignmentDetail"
        component={AssignmentDetailScreen}
      />
    </HomeStack.Navigator>
  );
}

function CoursesFlow() {
  return (
    <CoursesStack.Navigator screenOptions={stackOptions}>
      <CoursesStack.Screen name="Courses" component={CoursesScreen} />
      <CoursesStack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </CoursesStack.Navigator>
  );
}

function ScheduleFlow() {
  return (
    <ScheduleStack.Navigator screenOptions={stackOptions}>
      <ScheduleStack.Screen name="Schedule" component={ScheduleScreen} />
      <ScheduleStack.Screen
        name="SessionDetail"
        component={SessionDetailScreen}
      />
    </ScheduleStack.Navigator>
  );
}

function AssignmentsFlow() {
  return (
    <AssignmentsStack.Navigator screenOptions={stackOptions}>
      <AssignmentsStack.Screen
        name="Assignments"
        component={AssignmentsScreen}
      />
      <AssignmentsStack.Screen
        name="AssignmentDetail"
        component={AssignmentDetailScreen}
      />
    </AssignmentsStack.Navigator>
  );
}

function ProfileFlow() {
  return (
    <ProfileStack.Navigator screenOptions={stackOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="GradeDetail" component={GradeDetailScreen} />
    </ProfileStack.Navigator>
  );
}

const tabIcons: Record<keyof TabParamList, string> = {
  Overview: '⌂',
  Courses: '▤',
  Schedule: '▦',
  Assignments: '✓',
  Profile: '◎',
};

function TabBarIcon({
  color,
  focused,
  name,
}: {
  color: string;
  focused: boolean;
  name: keyof TabParamList;
}) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={[styles.tabIconText, { color }]}>{tabIcons[name]}</Text>
    </View>
  );
}

const tabBarIcons: Record<
  keyof TabParamList,
  (props: { color: string; focused: boolean; size: number }) => React.ReactNode
> = {
  Overview: props => <TabBarIcon {...props} name="Overview" />,
  Courses: props => <TabBarIcon {...props} name="Courses" />,
  Schedule: props => <TabBarIcon {...props} name="Schedule" />,
  Assignments: props => <TabBarIcon {...props} name="Assignments" />,
  Profile: props => <TabBarIcon {...props} name="Profile" />,
};

function App() {
  return (
    <SafeAreaProvider>
      <StudyProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.muted,
              tabBarLabelStyle: styles.tabLabel,
              tabBarStyle: styles.tabBar,
              tabBarIcon: tabBarIcons[route.name],
            })}
          >
            <Tab.Screen
              name="Overview"
              component={HomeFlow}
              options={{ title: 'Tổng quan' }}
            />
            <Tab.Screen
              name="Courses"
              component={CoursesFlow}
              options={{ title: 'Môn học' }}
            />
            <Tab.Screen
              name="Schedule"
              component={ScheduleFlow}
              options={{ title: 'Lịch học' }}
            />
            <Tab.Screen
              name="Assignments"
              component={AssignmentsFlow}
              options={{ title: 'Bài tập' }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileFlow}
              options={{ title: 'Cá nhân' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </StudyProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    elevation: 12,
  },
  tabLabel: { fontSize: 10, fontWeight: '600', marginTop: 1 },
  tabIcon: {
    width: 34,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabIconActive: { backgroundColor: colors.primarySoft },
  tabIconText: { fontSize: 20, fontWeight: '700', lineHeight: 24 },
});

export default App;
