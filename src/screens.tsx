import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStudy } from './StudyContext';
import { courses, grades, sessions } from './data';
import {
  Assignment,
  ClassSession,
  Course,
  Grade,
  StudyStackParamList,
} from './types';
import { ActionButton, Card, colors, commonStyles, Label, Pill } from './ui';

type Props<T extends keyof StudyStackParamList> = NativeStackScreenProps<
  StudyStackParamList,
  T
>;

const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];

function ScreenTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={commonStyles.headingBlock}>
      {eyebrow ? <Label>{eyebrow}</Label> : null}
      <Text style={commonStyles.title}>{title}</Text>
      {subtitle ? <Text style={commonStyles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function BackTitle({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
}) {
  return (
    <View style={styles.detailHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={commonStyles.back}>‹ Quay lại</Text>
      </TouchableOpacity>
      <Text style={commonStyles.title}>{title}</Text>
      {subtitle ? <Text style={commonStyles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <View style={commonStyles.empty}>
      <Text style={commonStyles.emptyIcon}>✦</Text>
      <Text style={commonStyles.emptyTitle}>{title}</Text>
      <Text style={commonStyles.emptyText}>{text}</Text>
    </View>
  );
}

function courseFor(id: string): Course | undefined {
  return courses.find(item => item.id === id);
}

function assignmentFor(
  assignments: Assignment[],
  id: string,
): Assignment | undefined {
  return assignments.find(item => item.id === id);
}

function CourseCard({ item, onPress }: { item: Course; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card style={styles.courseCard}>
        <View
          style={[styles.courseBadge, { backgroundColor: `${item.color}18` }]}
        >
          <Text style={[styles.courseBadgeText, { color: item.color }]}>
            {item.code.split(' ')[0]}
          </Text>
        </View>
        <View style={styles.courseInfo}>
          <View style={commonStyles.between}>
            <Label>{item.code}</Label>
            <Text style={styles.credit}>{item.credits} tín chỉ</Text>
          </View>
          <Text style={styles.courseName}>{item.name}</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressValue,
                { width: `${item.progress}%`, backgroundColor: item.color },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>{item.progress}% hoàn thành</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Card>
    </TouchableOpacity>
  );
}

function AssignmentCard({
  item,
  showToggle,
  onOpen,
  onToggle,
}: {
  item: Assignment;
  showToggle: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const course = courseFor(item.courseId);
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onOpen}>
      <Card style={styles.assignmentCard}>
        <View style={commonStyles.between}>
          <Pill tone={item.completed ? 'green' : 'orange'}>
            {item.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          </Pill>
          <Text style={styles.dueText}>{item.dueLabel}</Text>
        </View>
        <Text style={styles.assignmentTitle}>{item.title}</Text>
        <Text style={styles.assignmentCourse}>
          {course?.code} · {course?.name}
        </Text>
        <View style={[commonStyles.between, styles.assignmentFooter]}>
          <Text style={styles.assignmentType}>{item.type}</Text>
          {showToggle ? (
            <TouchableOpacity
              onPress={event => {
                event.stopPropagation();
                onToggle();
              }}
              style={styles.toggleButton}
            >
              <Text style={styles.toggleText}>
                {item.completed ? 'Đánh dấu chưa xong' : 'Hoàn thành ✓'}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.chevron}>›</Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export function HomeScreen({ navigation }: Props<'Home'>) {
  const { student, assignments } = useStudy();
  const upcoming = assignments
    .filter(item => !item.completed)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 3);

  return (
    <ScrollView
      style={commonStyles.page}
      contentContainerStyle={commonStyles.scroll}
    >
      <View style={styles.homeTop}>
        <View>
          <Label>THỨ HAI, 19 THÁNG 10</Label>
          <Text style={styles.greeting}>Chào buổi sáng,</Text>
          <Text style={styles.homeName}>
            {student.name.split(' ').slice(-1)[0]} 👋
          </Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.name
              .split(' ')
              .slice(-2)
              .map(part => part[0])
              .join('')}
          </Text>
        </View>
      </View>
      <View style={styles.studentStrip}>
        <Text style={styles.studentId}>{student.id}</Text>
        <Text style={styles.studentClass}>{student.className}</Text>
      </View>

      <Card style={styles.overviewCard}>
        <View style={commonStyles.between}>
          <View>
            <Label>HỌC KỲ 1 · NĂM HỌC 2026–2027</Label>
            <Text style={styles.semesterTitle}>Bạn đang học tốt!</Text>
            <Text style={styles.semesterSubtitle}>
              Tiếp tục duy trì nhịp học tập nhé.
            </Text>
          </View>
          <View style={styles.gpaCircle}>
            <Text style={styles.gpaValue}>3.62</Text>
            <Text style={styles.gpaLabel}>GPA</Text>
          </View>
        </View>
        <View style={styles.overviewStats}>
          <View>
            <Text style={styles.statNumber}>05</Text>
            <Text style={styles.statLabel}>Môn học</Text>
          </View>
          <View style={styles.statDivider} />
          <View>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Tín chỉ</Text>
          </View>
          <View style={styles.statDivider} />
          <View>
            <Text style={styles.statNumber}>
              {assignments.filter(item => !item.completed).length}
            </Text>
            <Text style={styles.statLabel}>Bài cần làm</Text>
          </View>
        </View>
      </Card>

      <View style={[commonStyles.between, styles.sectionHead]}>
        <Text style={commonStyles.sectionTitle}>Môn học của bạn</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
          <Text style={styles.seeAll}>Xem tất cả ›</Text>
        </TouchableOpacity>
      </View>
      {courses.slice(0, 3).map(item => (
        <CourseCard
          key={item.id}
          item={item}
          onPress={() =>
            navigation.navigate('CourseDetail', { courseId: item.id })
          }
        />
      ))}

      <View style={[commonStyles.between, styles.sectionHead]}>
        <Text style={commonStyles.sectionTitle}>Bài tập sắp đến hạn</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Assignments')}>
          <Text style={styles.seeAll}>Tất cả ›</Text>
        </TouchableOpacity>
      </View>
      {upcoming.length ? (
        upcoming.map(item => (
          <AssignmentCard
            key={item.id}
            item={item}
            showToggle={false}
            onToggle={() => {}}
            onOpen={() =>
              navigation.navigate('AssignmentDetail', { assignmentId: item.id })
            }
          />
        ))
      ) : (
        <Card>
          <EmptyState
            title="Tuyệt vời!"
            text="Bạn đã hoàn thành tất cả bài tập."
          />
        </Card>
      )}
    </ScrollView>
  );
}

export function CoursesScreen({ navigation }: Props<'Courses'>) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const value = query.trim().toLocaleLowerCase('vi');
    return courses.filter(
      item =>
        item.name.toLocaleLowerCase('vi').includes(value) ||
        item.code.toLocaleLowerCase('vi').includes(value),
    );
  }, [query]);

  return (
    <View style={commonStyles.page}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={commonStyles.scroll}
        ListHeaderComponent={
          <>
            <ScreenTitle
              eyebrow="HỌC KỲ 1 · 2026–2027"
              title="Môn học"
              subtitle={`${courses.length} môn học đang theo học`}
            />
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Tìm theo tên hoặc mã môn học"
                placeholderTextColor={colors.muted}
                style={styles.searchInput}
                returnKeyType="search"
              />
              {query.length > 0 ? (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Text style={styles.clearSearch}>×</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={[commonStyles.between, styles.listMeta]}>
              <Label>DANH SÁCH MÔN HỌC</Label>
              <Text style={commonStyles.small}>{filtered.length} kết quả</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Card>
            <EmptyState
              title="Không tìm thấy môn học"
              text="Thử tìm bằng tên môn học hoặc mã môn khác nhé."
            />
          </Card>
        }
        renderItem={({ item }) => (
          <CourseCard
            item={item}
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

export function CourseDetailScreen({
  navigation,
  route,
}: Props<'CourseDetail'>) {
  const course = courseFor(route.params.courseId);
  const { assignments } = useStudy();
  if (!course) {
    return (
      <View style={commonStyles.page}>
        <View style={commonStyles.scroll}>
          <BackTitle
            title="Không tìm thấy môn học"
            onBack={navigation.goBack}
          />
        </View>
      </View>
    );
  }
  const courseAssignments = assignments.filter(
    item => item.courseId === course.id,
  );
  const courseSessions = sessions.filter(item => item.courseId === course.id);
  return (
    <ScrollView
      style={commonStyles.page}
      contentContainerStyle={commonStyles.scroll}
    >
      <BackTitle
        title="Chi tiết môn học"
        subtitle={course.code}
        onBack={navigation.goBack}
      />
      <Card style={styles.detailCard}>
        <View
          style={[styles.detailMark, { backgroundColor: `${course.color}18` }]}
        >
          <Text style={[styles.detailMarkText, { color: course.color }]}>
            {course.code.split(' ')[0]}
          </Text>
        </View>
        <Text style={styles.detailTitle}>{course.name}</Text>
        <Text style={styles.detailCaption}>
          {course.code} · {course.credits} tín chỉ
        </Text>
        <View style={commonStyles.divider} />
        <InfoRow label="Giảng viên" value={course.lecturer} />
        <InfoRow label="Phòng học chính" value={course.room} />
        <InfoRow label="Điểm hiện tại" value={course.grade} />
      </Card>
      <Card style={styles.progressCard}>
        <View style={commonStyles.between}>
          <Text style={commonStyles.sectionTitle}>Tiến độ học tập</Text>
          <Text style={styles.progressPercent}>{course.progress}%</Text>
        </View>
        <View style={[styles.progressTrack, styles.detailProgress]}>
          <View
            style={[
              styles.progressValue,
              { width: `${course.progress}%`, backgroundColor: course.color },
            ]}
          />
        </View>
        <Text style={commonStyles.small}>Đã hoàn thành nội dung học kỳ</Text>
      </Card>
      <Text style={[commonStyles.sectionTitle, styles.sectionStandalone]}>
        Lịch học ({courseSessions.length})
      </Text>
      {courseSessions.map(item => (
        <Card key={item.id} style={styles.compactRow}>
          <Text style={styles.sessionStart}>
            {item.day} · {item.start}
          </Text>
          <Text style={styles.assignmentCourse}>
            {item.kind} · {item.room}
          </Text>
        </Card>
      ))}
      <Text style={[commonStyles.sectionTitle, styles.sectionStandalone]}>
        Bài tập ({courseAssignments.length})
      </Text>
      {courseAssignments.length ? (
        courseAssignments.map(item => (
          <Card key={item.id} style={styles.compactRow}>
            <Text style={styles.courseName}>{item.title}</Text>
            <Text style={styles.assignmentCourse}>
              Hạn nộp: {item.dueLabel}
            </Text>
          </Card>
        ))
      ) : (
        <Text style={commonStyles.small}>Chưa có bài tập cho môn học này.</Text>
      )}
    </ScrollView>
  );
}

export function ScheduleScreen({ navigation }: Props<'Schedule'>) {
  const [selected, setSelected] = useState('Thứ 2');
  const todaySessions = sessions.filter(item => item.day === selected);
  return (
    <View style={commonStyles.page}>
      <FlatList
        data={todaySessions}
        keyExtractor={item => item.id}
        contentContainerStyle={commonStyles.scroll}
        ListHeaderComponent={
          <>
            <ScreenTitle
              eyebrow="THỜI KHÓA BIỂU"
              title="Lịch học"
              subtitle="Thời khóa biểu tuần này của bạn"
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.daySelector}
            >
              {days.map((day, index) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelected(day)}
                  style={[
                    styles.dayButton,
                    selected === day && styles.dayButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayName,
                      selected === day && styles.dayNameActive,
                    ]}
                  >
                    {day.replace('Thứ ', 'T')}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      selected === day && styles.dayNumberActive,
                    ]}
                  >
                    {19 + index}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={[commonStyles.between, styles.scheduleDate]}>
              <Text style={commonStyles.sectionTitle}>
                {selected}, 19–23/10
              </Text>
              <Pill>{todaySessions.length} buổi học</Pill>
            </View>
          </>
        }
        ListEmptyComponent={
          <Card>
            <EmptyState
              title="Bạn không có tiết học"
              text={`${selected} hiện chưa có buổi học nào. Hãy chọn ngày khác.`}
            />
          </Card>
        }
        renderItem={({ item }) => (
          <SessionCard
            item={item}
            onPress={() =>
              navigation.navigate('SessionDetail', { sessionId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

function SessionCard({
  item,
  onPress,
}: {
  item: ClassSession;
  onPress: () => void;
}) {
  const course = courseFor(item.courseId);
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card style={styles.sessionCard}>
        <View style={styles.timeRail}>
          <Text style={styles.sessionStart}>{item.start}</Text>
          <View style={styles.timeLine} />
          <Text style={styles.sessionEnd}>{item.end}</Text>
        </View>
        <View
          style={[styles.sessionColor, { backgroundColor: course?.color }]}
        />
        <View style={styles.sessionInfo}>
          <Pill>{item.kind}</Pill>
          <Text style={styles.courseName}>{course?.name}</Text>
          <Text style={styles.assignmentCourse}>
            {course?.code} · Phòng {item.room}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Card>
    </TouchableOpacity>
  );
}

export function SessionDetailScreen({
  navigation,
  route,
}: Props<'SessionDetail'>) {
  const item = sessions.find(session => session.id === route.params.sessionId);
  if (!item) {
    return (
      <View style={commonStyles.page}>
        <View style={commonStyles.scroll}>
          <BackTitle
            title="Không tìm thấy buổi học"
            onBack={navigation.goBack}
          />
        </View>
      </View>
    );
  }
  const course = courseFor(item.courseId);
  return (
    <ScrollView
      style={commonStyles.page}
      contentContainerStyle={commonStyles.scroll}
    >
      <BackTitle
        title="Chi tiết buổi học"
        subtitle={item.date}
        onBack={navigation.goBack}
      />
      <Card style={styles.detailCard}>
        <Pill>{item.kind}</Pill>
        <Text style={[styles.detailTitle, styles.detailTitleSpaced]}>
          {course?.name}
        </Text>
        <Text style={styles.detailCaption}>{course?.code}</Text>
        <View style={commonStyles.divider} />
        <InfoRow label="Thời gian" value={`${item.start} – ${item.end}`} />
        <InfoRow label="Ngày học" value={`${item.day}, ${item.date}`} />
        <InfoRow label="Phòng học" value={item.room} />
        <InfoRow
          label="Giảng viên"
          value={course?.lecturer ?? 'Chưa cập nhật'}
        />
      </Card>
      <Card style={styles.noteCard}>
        <Text style={commonStyles.sectionTitle}>Nhắc bạn</Text>
        <Text style={[commonStyles.subtitle, styles.noteText]}>
          Hãy đến lớp trước giờ học 10 phút và chuẩn bị tài liệu môn học.
        </Text>
      </Card>
    </ScrollView>
  );
}

export function AssignmentsScreen({ navigation }: Props<'Assignments'>) {
  const { assignments, toggleAssignment } = useStudy();
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');
  const visible = assignments.filter(item => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'done') return item.completed;
    return true;
  });
  return (
    <View style={commonStyles.page}>
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        contentContainerStyle={commonStyles.scroll}
        ListHeaderComponent={
          <>
            <ScreenTitle
              eyebrow="KẾ HOẠCH HỌC TẬP"
              title="Bài tập"
              subtitle={`${
                assignments.filter(item => !item.completed).length
              } bài đang chờ bạn hoàn thành`}
            />
            <View style={styles.filters}>
              {[
                ['all', 'Tất cả'],
                ['pending', 'Cần làm'],
                ['done', 'Đã xong'],
              ].map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setFilter(key as 'all' | 'pending' | 'done')}
                  style={[
                    styles.filterChip,
                    filter === key && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === key && styles.filterTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        ListEmptyComponent={
          <Card>
            <EmptyState
              title="Danh sách trống"
              text="Không có bài tập phù hợp với bộ lọc."
            />
          </Card>
        }
        renderItem={({ item }) => (
          <AssignmentCard
            item={item}
            showToggle
            onToggle={() => toggleAssignment(item.id)}
            onOpen={() =>
              navigation.navigate('AssignmentDetail', { assignmentId: item.id })
            }
          />
        )}
      />
    </View>
  );
}

export function AssignmentDetailScreen({
  navigation,
  route,
}: Props<'AssignmentDetail'>) {
  const { assignments, toggleAssignment } = useStudy();
  const item = assignmentFor(assignments, route.params.assignmentId);
  if (!item) {
    return (
      <View style={commonStyles.page}>
        <View style={commonStyles.scroll}>
          <BackTitle
            title="Không tìm thấy bài tập"
            onBack={navigation.goBack}
          />
        </View>
      </View>
    );
  }
  const course = courseFor(item.courseId);
  return (
    <ScrollView
      style={commonStyles.page}
      contentContainerStyle={commonStyles.scroll}
    >
      <BackTitle
        title="Chi tiết bài tập"
        subtitle={item.type}
        onBack={navigation.goBack}
      />
      <Card style={styles.detailCard}>
        <Pill tone={item.completed ? 'green' : 'orange'}>
          {item.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </Pill>
        <Text style={[styles.detailTitle, styles.detailTitleSpaced]}>
          {item.title}
        </Text>
        <Text style={styles.detailCaption}>
          {course?.code} · {course?.name}
        </Text>
        <View style={commonStyles.divider} />
        <InfoRow label="Hạn nộp" value={item.dueLabel} />
        <InfoRow label="Học phần" value={course?.name ?? 'Chưa cập nhật'} />
        <Text style={styles.description}>{item.description}</Text>
      </Card>
      <ActionButton
        title={
          item.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'
        }
        secondary={item.completed}
        onPress={() => toggleAssignment(item.id)}
      />
    </ScrollView>
  );
}

export function ProfileScreen({ navigation }: Props<'Profile'>) {
  const { student, saveStudent } = useStudy();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(student);
  const [error, setError] = useState('');

  function update(field: 'name' | 'email' | 'phone', value: string) {
    setDraft(current => ({ ...current, [field]: value }));
    setError('');
  }

  function save() {
    if (!draft.name.trim() || !draft.email.trim() || !draft.phone.trim()) {
      setError('Vui lòng nhập đầy đủ họ tên, email và số điện thoại.');
      return;
    }
    if (!draft.email.includes('@')) {
      setError('Email chưa đúng định dạng.');
      return;
    }
    saveStudent({
      ...draft,
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
    });
    setError('');
    setEditing(false);
  }

  return (
    <ScrollView
      style={commonStyles.page}
      contentContainerStyle={commonStyles.scroll}
    >
      <ScreenTitle
        eyebrow="HỒ SƠ SINH VIÊN"
        title="Cá nhân"
        subtitle="Thông tin và kết quả học tập"
      />
      <Card style={styles.profileCard}>
        <View style={styles.profileHero}>
          <View style={[styles.avatar, styles.profileAvatar]}>
            <Text style={styles.avatarText}>
              {student.name
                .split(' ')
                .slice(-2)
                .map(part => part[0])
                .join('')}
            </Text>
          </View>
          <View style={styles.profileNameBox}>
            {editing ? (
              <TextInput
                value={draft.name}
                onChangeText={value => update('name', value)}
                style={styles.editName}
                placeholder="Họ và tên"
              />
            ) : (
              <Text style={styles.profileName}>{student.name}</Text>
            )}
            <Text style={styles.studentId}>{student.id}</Text>
          </View>
        </View>
        <View style={commonStyles.divider} />
        <InfoRow label="Lớp" value={student.className} />
        <InfoRow label="Ngành học" value={student.major} />
        <EditableInfo
          label="Email"
          value={editing ? draft.email : student.email}
          editing={editing}
          onChange={value => update('email', value)}
          keyboardType="email-address"
        />
        <EditableInfo
          label="Số điện thoại"
          value={editing ? draft.phone : student.phone}
          editing={editing}
          onChange={value => update('phone', value)}
          keyboardType="phone-pad"
        />
        {editing ? (
          <>
            {error ? <Text style={styles.formError}>{error}</Text> : null}
            <View style={styles.editActions}>
              <TouchableOpacity
                onPress={() => {
                  setDraft(student);
                  setError('');
                  setEditing(false);
                }}
              >
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <ActionButton title="Lưu thay đổi" onPress={save} />
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editLink}
            onPress={() => {
              setDraft(student);
              setEditing(true);
            }}
          >
            <Text style={styles.seeAll}>Chỉnh sửa thông tin ›</Text>
          </TouchableOpacity>
        )}
      </Card>

      <View style={[commonStyles.between, styles.sectionHead]}>
        <View>
          <Text style={commonStyles.sectionTitle}>Kết quả học tập</Text>
          <Text style={commonStyles.small}>Điểm trung bình tích lũy</Text>
        </View>
        <View style={styles.profileGpa}>
          <Text style={styles.profileGpaValue}>3.62</Text>
          <Text style={styles.profileGpaLabel}>/ 4.0</Text>
        </View>
      </View>
      {grades.map(grade => (
        <GradeCard
          key={grade.id}
          item={grade}
          onPress={() =>
            navigation.navigate('GradeDetail', { gradeId: grade.id })
          }
        />
      ))}
    </ScrollView>
  );
}

function GradeCard({ item, onPress }: { item: Grade; onPress: () => void }) {
  const course = courseFor(item.courseId);
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card style={styles.gradeCard}>
        <View style={styles.gradeMark}>
          <Text style={styles.gradeMarkText}>{item.letter}</Text>
        </View>
        <View style={styles.gradeInfo}>
          <Text style={styles.courseName}>{course?.name}</Text>
          <Text style={styles.assignmentCourse}>{course?.code}</Text>
        </View>
        <Text style={styles.gradeScore}>{item.score}</Text>
        <Text style={styles.chevron}>›</Text>
      </Card>
    </TouchableOpacity>
  );
}

export function GradeDetailScreen({ navigation, route }: Props<'GradeDetail'>) {
  const grade = grades.find(item => item.id === route.params.gradeId);
  if (!grade) {
    return (
      <View style={commonStyles.page}>
        <View style={commonStyles.scroll}>
          <BackTitle
            title="Không tìm thấy kết quả"
            onBack={navigation.goBack}
          />
        </View>
      </View>
    );
  }
  const course = courseFor(grade.courseId);
  return (
    <ScrollView
      style={commonStyles.page}
      contentContainerStyle={commonStyles.scroll}
    >
      <BackTitle
        title="Chi tiết kết quả"
        subtitle="Học kỳ 1 · 2026–2027"
        onBack={navigation.goBack}
      />
      <Card style={styles.gradeDetailCard}>
        <View style={styles.gradeCircle}>
          <Text style={styles.gradeCircleLetter}>{grade.letter}</Text>
          <Text style={styles.gradeCircleNumber}>{grade.score}/10</Text>
        </View>
        <Text style={styles.detailTitle}>{course?.name}</Text>
        <Text style={styles.detailCaption}>
          {course?.code} · {course?.credits} tín chỉ
        </Text>
        <View style={commonStyles.divider} />
        <InfoRow label="Điểm chữ" value={grade.letter} />
        <InfoRow label="Điểm tổng kết" value={`${grade.score} / 10`} />
        <InfoRow label="Học kỳ" value="Học kỳ 1 · 2026–2027" />
      </Card>
      <Card style={styles.noteCard}>
        <Text style={commonStyles.sectionTitle}>Nhận xét</Text>
        <Text style={[commonStyles.subtitle, styles.noteText]}>
          {grade.note}
        </Text>
      </Card>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function EditableInfo({
  label,
  value,
  editing,
  onChange,
  keyboardType,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  keyboardType: 'email-address' | 'phone-pad';
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      {editing ? (
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          autoCapitalize={
            keyboardType === 'email-address' ? 'none' : 'sentences'
          }
          style={styles.infoInput}
        />
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontSize: 16, color: colors.secondary, marginTop: 9 },
  homeName: {
    fontSize: 28,
    color: colors.ink,
    fontWeight: '800',
    marginTop: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  avatarText: { fontSize: 17, color: colors.primary, fontWeight: '800' },
  studentStrip: { flexDirection: 'row', gap: 10, marginTop: 8 },
  studentId: { fontSize: 11, color: colors.secondary, fontWeight: '600' },
  studentClass: { fontSize: 11, color: colors.muted },
  overviewCard: {
    marginTop: 20,
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  semesterTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 9,
  },
  semesterSubtitle: { fontSize: 11, color: '#B8C0DC', marginTop: 4 },
  gpaCircle: {
    width: 63,
    height: 63,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303B65',
    borderWidth: 2,
    borderColor: '#7887F1',
  },
  gpaValue: { fontSize: 18, color: '#FFFFFF', fontWeight: '800' },
  gpaLabel: { fontSize: 9, color: '#B8C0DC' },
  overviewStats: {
    marginTop: 19,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#3B456B',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statNumber: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
  },
  statLabel: { fontSize: 10, color: '#B8C0DC', marginTop: 3 },
  statDivider: { width: 1, backgroundColor: '#3B456B' },
  sectionHead: { marginTop: 25, marginBottom: 13 },
  seeAll: { fontSize: 11, color: colors.primary, fontWeight: '700' },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginBottom: 10,
  },
  courseBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseBadgeText: { fontSize: 11, fontWeight: '800' },
  courseInfo: { flex: 1 },
  credit: { fontSize: 10, color: colors.muted },
  courseName: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
    fontWeight: '700',
    marginTop: 4,
  },
  progressTrack: {
    height: 5,
    backgroundColor: '#ECEEF4',
    borderRadius: 5,
    marginTop: 10,
  },
  progressValue: { height: 5, borderRadius: 5 },
  progressLabel: { fontSize: 9, color: colors.muted, marginTop: 5 },
  chevron: { fontSize: 24, color: '#B2B8C8', marginLeft: 9 },
  assignmentCard: { marginBottom: 10, padding: 15 },
  dueText: { fontSize: 11, fontWeight: '700', color: colors.orange },
  assignmentTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    color: colors.ink,
    marginTop: 11,
  },
  assignmentCourse: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.secondary,
    marginTop: 4,
  },
  assignmentFooter: { marginTop: 12 },
  assignmentType: { fontSize: 10, color: colors.muted },
  toggleButton: {
    backgroundColor: colors.primarySoft,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  toggleText: { fontSize: 10, color: colors.primary, fontWeight: '700' },
  searchBox: {
    height: 49,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  searchIcon: { fontSize: 22, color: colors.muted, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 12, color: colors.ink, paddingVertical: 0 },
  clearSearch: { fontSize: 22, color: colors.muted, paddingHorizontal: 4 },
  listMeta: { marginTop: 23, marginBottom: 12 },
  detailHeader: { marginBottom: 20 },
  backButton: { alignSelf: 'flex-start', marginBottom: 16 },
  detailCard: { padding: 18 },
  detailMark: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailMarkText: { fontSize: 13, fontWeight: '800' },
  detailTitle: {
    fontSize: 20,
    lineHeight: 27,
    color: colors.ink,
    fontWeight: '800',
    marginTop: 15,
  },
  detailTitleSpaced: { marginTop: 12 },
  detailCaption: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 5,
    marginBottom: 17,
  },
  infoRow: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  infoLabel: { fontSize: 11, color: colors.muted },
  infoValue: {
    fontSize: 12,
    color: colors.ink,
    fontWeight: '700',
    textAlign: 'right',
    flexShrink: 1,
  },
  progressCard: { marginTop: 13 },
  progressPercent: { fontSize: 15, fontWeight: '800', color: colors.primary },
  detailProgress: { height: 7, marginTop: 13, marginBottom: 7 },
  sectionStandalone: { marginTop: 23, marginBottom: 11 },
  compactRow: { marginBottom: 9, paddingVertical: 12 },
  daySelector: { gap: 9, paddingBottom: 17 },
  dayButton: {
    width: 58,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayName: { fontSize: 10, color: colors.secondary, fontWeight: '600' },
  dayNameActive: { color: '#DDE2FF' },
  dayNumber: {
    fontSize: 19,
    color: colors.ink,
    fontWeight: '800',
    marginTop: 4,
  },
  dayNumberActive: { color: '#FFFFFF' },
  scheduleDate: { marginTop: 5, marginBottom: 13 },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginBottom: 11,
  },
  timeRail: { width: 43, alignItems: 'center' },
  sessionStart: { fontSize: 11, color: colors.ink, fontWeight: '800' },
  timeLine: {
    width: 1,
    height: 13,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  sessionEnd: { fontSize: 9, color: colors.muted },
  sessionColor: { width: 3, height: 62, borderRadius: 3, marginHorizontal: 11 },
  sessionInfo: { flex: 1, alignItems: 'flex-start' },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 19 },
  filterChip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: colors.surface,
  },
  filterChipActive: { backgroundColor: colors.primary },
  filterText: { fontSize: 11, color: colors.secondary, fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },
  description: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.secondary,
    marginTop: 12,
  },
  profileCard: { padding: 16 },
  profileHero: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  profileAvatar: { width: 58, height: 58, borderRadius: 19 },
  profileNameBox: { flex: 1, marginLeft: 13 },
  profileName: {
    fontSize: 17,
    color: colors.ink,
    fontWeight: '800',
    marginBottom: 5,
  },
  editName: {
    fontSize: 16,
    color: colors.ink,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 3,
  },
  editLink: { alignItems: 'center', paddingTop: 13 },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelText: { fontSize: 13, fontWeight: '700', color: colors.secondary },
  formError: { fontSize: 11, color: colors.red, marginTop: 8 },
  infoInput: {
    flex: 1,
    minHeight: 36,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    textAlign: 'right',
    fontSize: 12,
    color: colors.ink,
    paddingVertical: 3,
  },
  profileGpa: { flexDirection: 'row', alignItems: 'baseline' },
  profileGpaValue: { fontSize: 19, fontWeight: '800', color: colors.primary },
  profileGpaLabel: { fontSize: 10, color: colors.muted },
  gradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginBottom: 9,
  },
  gradeMark: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeMarkText: { fontSize: 13, color: colors.green, fontWeight: '800' },
  gradeInfo: { flex: 1, marginHorizontal: 11 },
  gradeScore: { fontSize: 15, color: colors.ink, fontWeight: '800' },
  gradeDetailCard: { alignItems: 'center', padding: 20 },
  gradeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderWidth: 5,
    borderColor: '#D9DEFF',
  },
  gradeCircleLetter: { fontSize: 30, color: colors.primary, fontWeight: '800' },
  gradeCircleNumber: { fontSize: 10, color: colors.secondary, marginTop: 1 },
  noteCard: { marginTop: 13 },
  noteText: { marginTop: 6 },
});
