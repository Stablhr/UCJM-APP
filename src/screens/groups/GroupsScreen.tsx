import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import ScreenShell from '../../components/ScreenShell';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import FadeInView from '../../components/FadeInView';

interface CellGroup {
  id: string;
  name: string;
  memberCount: number;
  inviteCode: string;
}

const sampleGroups: CellGroup[] = [
  { id: '1', name: 'Morning Glory', memberCount: 8, inviteCode: 'MORNING24' },
  { id: '2', name: 'Youth on Fire', memberCount: 12, inviteCode: 'YOUTH42' },
];

const sampleMembers = [
  { id: '1', name: 'Sarah Johnson', readingStreak: 12 },
  { id: '2', name: 'Mark Williams', readingStreak: 5 },
  { id: '3', name: 'Emily Davis', readingStreak: 0 },
  { id: '4', name: 'David Chen', readingStreak: 20 },
];

export default function GroupsScreen() {
  const { tokens, isDark } = useTheme();
  const [groups] = useState(sampleGroups);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  if (selectedGroup) {
    const group = groups.find((g) => g.id === selectedGroup);
    return (
      <ScreenShell>
        <ScreenHeader
          title={group?.name ?? 'Group'}
          subtitle={`${group?.memberCount} members`}
          showBack
          rightAction={
            <View style={{ borderRadius: 8, borderWidth: 1, borderColor: tokens.border }}
              className="px-4 py-2 flex-row items-center"
            >
              <Feather name="shield" size={12} color={tokens.text} />
              <Text style={{ color: tokens.text, fontSize: 14, letterSpacing: 0.14, fontWeight: '500' }} className="ml-1">LEADER</Text>
            </View>
          }
        />
        <ScrollView className="flex-1" contentContainerClassName="px-5 pb-24 flex-grow">
          <FadeInView index={0}>
            <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 8 }}
              className="p-5 mb-6"
            >
              <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mb-1.5">INVITE CODE</Text>
              <Text style={{ color: tokens.text, fontSize: 24, fontFamily: 'Anton_400Regular', letterSpacing: 0.24 }}>
                {group?.inviteCode}
              </Text>
              <View className="flex-row items-center mt-2">
                <Feather name="info" size={12} color={tokens.textMuted} style={{ opacity: 0.5 }} />
                <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.5 }} className="ml-1.5">
                  Share this code with friends to join your group
                </Text>
              </View>
            </View>
          </FadeInView>

          <FadeInView index={1}>
            <View className="flex-row items-center mb-3">
              <Feather name="users" size={18} color={tokens.text} />
              <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }} className="ml-2">Members</Text>
            </View>
          </FadeInView>
          <View className="gap-2">
            {sampleMembers.map((member, i) => (
              <FadeInView key={member.id} index={i + 2}>
                <View
                  style={{
                    backgroundColor: tokens.surface,
                    borderWidth: 1,
                    borderColor: tokens.border,
                    borderRadius: 8,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 8 }}
                      className="w-11 h-11 items-center justify-center mr-3"
                    >
                      <Text style={{ color: tokens.accent, fontWeight: '700', fontSize: 18 }}>
                        {member.name.charAt(0)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text style={{ color: tokens.text, fontSize: 16, letterSpacing: 0.16, fontWeight: '500' }}>{member.name}</Text>
                      <View className="flex-row items-center mt-0.5">
                        {member.readingStreak > 0 ? (
                          <>
                            <Feather name="zap" size={14} color={tokens.accent} />
                            <Text style={{ color: tokens.accent, fontSize: 14, letterSpacing: 0.14 }} className="ml-1">
                              {member.readingStreak} day streak
                            </Text>
                          </>
                        ) : (
                          <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.4 }}>Reading not started</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </FadeInView>
            ))}
          </View>
        </ScrollView>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <ScreenHeader title="Cell Groups" subtitle="Connect & grow together" />
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-24 flex-grow">
        <FadeInView index={0}>
          <View className="flex-row gap-3 mb-6">
            <Button
              title="Create Group"
              onPress={() => { setShowCreate(true); setShowJoin(false); }}
              variant="primary"
              className="flex-1"
              icon={<Feather name="plus" size={16} color={tokens.background} />}
            />
            <Button
              title="Join Group"
              onPress={() => { setShowJoin(true); setShowCreate(false); }}
              variant="outline"
              className="flex-1"
              icon={<Feather name="log-in" size={16} color={tokens.text} />}
            />
          </View>
        </FadeInView>

        {showCreate && (
          <FadeInView index={1}>
            <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 8 }}
              className="p-5 mb-6"
            >
              <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }} className="mb-3">Create a Cell Group</Text>
              <TextInput
                value={newGroupName}
                onChangeText={setNewGroupName}
                placeholder="Group name..."
                placeholderTextColor={tokens.textMuted + '60'}
                style={{
                  backgroundColor: isDark ? tokens.surface : tokens.background,
                  borderWidth: 1,
                  borderColor: tokens.borderMuted,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  color: tokens.text,
                  marginBottom: 12,
                }}
              />
              <View className="flex-row gap-3">
                <Button
                  title="Cancel"
                  onPress={() => { setShowCreate(false); setNewGroupName(''); }}
                  variant="ghost"
                  className="flex-1"
                />
                <Button
                  title="Create"
                  onPress={() => {
                    if (newGroupName.trim()) {
                      setShowCreate(false);
                      setNewGroupName('');
                    }
                  }}
                  variant="primary"
                  className="flex-1"
                />
              </View>
            </View>
          </FadeInView>
        )}

        {showJoin && (
          <FadeInView index={1}>
            <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 8 }}
              className="p-5 mb-6"
            >
              <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }} className="mb-3">Join a Cell Group</Text>
              <TextInput
                value={inviteCode}
                onChangeText={setInviteCode}
                placeholder="Enter invite code..."
                placeholderTextColor={tokens.textMuted + '60'}
                autoCapitalize="characters"
                style={{
                  backgroundColor: isDark ? tokens.surface : tokens.background,
                  borderWidth: 1,
                  borderColor: tokens.borderMuted,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  color: tokens.text,
                  fontSize: 18,
                  letterSpacing: 3,
                  marginBottom: 12,
                }}
              />
              <View className="flex-row gap-3">
                <Button
                  title="Cancel"
                  onPress={() => { setShowJoin(false); setInviteCode(''); }}
                  variant="ghost"
                  className="flex-1"
                />
                <Button
                  title="Join"
                  onPress={() => {
                    if (inviteCode.trim()) {
                      setShowJoin(false);
                      setInviteCode('');
                    }
                  }}
                  variant="primary"
                  className="flex-1"
                />
              </View>
            </View>
          </FadeInView>
        )}

        <FadeInView index={2}>
          <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }} className="mb-3">Your Groups</Text>
        </FadeInView>
        {groups.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="users" size={48} color={tokens.textMuted} style={{ opacity: 0.5 }} />
            <Text style={{ color: tokens.textMuted, fontSize: 18, letterSpacing: 0.18, opacity: 0.6 }} className="mt-4">No groups yet</Text>
            <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14, opacity: 0.4 }} className="mt-1">Create or join one to get started</Text>
          </View>
        ) : (
          <View className="gap-3">
            {groups.map((group, i) => (
              <FadeInView key={group.id} index={i + 3}>
                <TouchableOpacity
                  key={group.id}
                  onPress={() => setSelectedGroup(group.id)}
                  style={{
                    backgroundColor: tokens.surface,
                    borderWidth: 1,
                    borderColor: tokens.border,
                    borderRadius: 8,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  className="active:opacity-80"
                >
                  <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 8 }}
                    className="w-12 h-12 items-center justify-center mr-4"
                  >
                    <Feather name="users" size={22} color={tokens.accent} />
                  </View>
                  <View className="flex-1">
                    <Text style={{ color: tokens.text, fontSize: 18, letterSpacing: 0.18, fontWeight: '500' }}>{group.name}</Text>
                    <Text style={{ color: tokens.textMuted, fontSize: 14, letterSpacing: 0.14 }} className="mt-0.5">
                      {group.memberCount} members
                    </Text>
                  </View>
                  <View style={{ borderRadius: 8, borderWidth: 1, borderColor: tokens.borderMuted, backgroundColor: tokens.surface }}
                    className="px-3 py-1.5"
                  >
                    <Text style={{ color: tokens.text, fontSize: 14, letterSpacing: 0.14, fontWeight: '700' }}>
                      {group.inviteCode}
                    </Text>
                  </View>
                </TouchableOpacity>
              </FadeInView>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenShell>
  );
}
