import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import GradientBackground from '../../components/GradientBackground';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';

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
  const { tokens } = useTheme();
  const [groups] = useState(sampleGroups);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  if (selectedGroup) {
    const group = groups.find((g) => g.id === selectedGroup);
    return (
      <GradientBackground>
        <ScreenHeader
          title={group?.name ?? 'Group'}
          subtitle={`${group?.memberCount} members`}
          showBack
          rightAction={
            <View style={{ backgroundColor: tokens.accentMuted, borderWidth: 1, borderColor: tokens.borderAccent, borderRadius: 12 }}
              className="px-4 py-2 flex-row items-center"
            >
              <Feather name="shield" size={12} color={tokens.accent} />
              <Text style={{ color: tokens.accent }} className="text-xs font-semibold ml-1">LEADER</Text>
            </View>
          }
        />
<ScrollView contentContainerClassName="px-5 pb-24">
          <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 16 }}
            className="p-5 mb-6"
          >
            <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-xs mb-1.5 font-medium">INVITE CODE</Text>
            <Text style={{ color: tokens.accent }} className="text-2xl font-bold tracking-[0.3em]">
              {group?.inviteCode}
            </Text>
            <View className="flex-row items-center mt-2">
              <Feather name="info" size={12} color={tokens.textMuted} style={{ opacity: 0.5 }} />
              <Text style={{ color: tokens.textMuted, opacity: 0.5 }} className="text-xs ml-1.5">
                Share this code with friends to join your group
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3">
            <Feather name="users" size={18} color={tokens.text} />
            <Text style={{ color: tokens.text }} className="text-lg font-semibold ml-2">Members</Text>
          </View>
          <View className="gap-2">
            {sampleMembers.map((member) => (
              <View
                key={member.id}
                style={{
                  backgroundColor: tokens.surface,
                  borderWidth: 1,
                  borderColor: tokens.border,
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View className="flex-row items-center flex-1">
                  <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 12 }}
                    className="w-11 h-11 items-center justify-center mr-3"
                  >
                    <Text style={{ color: tokens.accent }} className="font-bold text-lg">
                      {member.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text style={{ color: tokens.text }} className="font-semibold">{member.name}</Text>
                    <View className="flex-row items-center mt-0.5">
                      {member.readingStreak > 0 ? (
                        <>
                          <Feather name="zap" size={14} color="#22c55e" />
                          <Text className="text-green-400 text-sm ml-1">
                            {member.readingStreak} day streak
                          </Text>
                        </>
                      ) : (
                        <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-sm">Reading not started</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScreenHeader title="Cell Groups" subtitle="Connect & grow together" />
      <ScrollView contentContainerClassName="px-5 pb-24">
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
            icon={<Feather name="log-in" size={16} color={tokens.accent} />}
          />
        </View>

        {showCreate && (
          <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 16 }}
            className="p-5 mb-6"
          >
            <Text style={{ color: tokens.text }} className="text-lg font-semibold mb-3">Create a Cell Group</Text>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Group name..."
              placeholderTextColor={tokens.textMuted + '60'}
              style={{
                backgroundColor: tokens.surfaceAlt,
                borderWidth: 1,
                borderColor: tokens.border,
                borderRadius: 12,
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
        )}

        {showJoin && (
          <View style={{ backgroundColor: tokens.surface, borderWidth: 1, borderColor: tokens.border, borderRadius: 16 }}
            className="p-5 mb-6"
          >
            <Text style={{ color: tokens.text }} className="text-lg font-semibold mb-3">Join a Cell Group</Text>
            <TextInput
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="Enter invite code..."
              placeholderTextColor={tokens.textMuted + '60'}
              autoCapitalize="characters"
              style={{
                backgroundColor: tokens.surfaceAlt,
                borderWidth: 1,
                borderColor: tokens.border,
                borderRadius: 12,
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
        )}

        <Text style={{ color: tokens.text }} className="text-lg font-semibold mb-3">Your Groups</Text>
        {groups.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="users" size={48} color={tokens.textMuted} style={{ opacity: 0.5 }} />
            <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-base mt-4">No groups yet</Text>
            <Text style={{ color: tokens.textMuted, opacity: 0.4 }} className="text-sm mt-1">Create or join one to get started</Text>
          </View>
        ) : (
          <View className="gap-3">
            {groups.map((group) => (
              <TouchableOpacity
                key={group.id}
                onPress={() => setSelectedGroup(group.id)}
                style={{
                  backgroundColor: tokens.surface,
                  borderWidth: 1,
                  borderColor: tokens.border,
                  borderRadius: 16,
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                className="active:opacity-80"
              >
                <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 12 }}
                  className="w-12 h-12 items-center justify-center mr-4"
                >
                  <Feather name="users" size={22} color={tokens.accent} />
                </View>
                <View className="flex-1">
                  <Text style={{ color: tokens.text }} className="text-lg font-semibold">{group.name}</Text>
                  <Text style={{ color: tokens.textMuted, opacity: 0.6 }} className="text-sm mt-0.5">
                    {group.memberCount} members
                  </Text>
                </View>
                <View style={{ backgroundColor: tokens.accentMuted, borderRadius: 8 }}
                  className="px-3 py-1.5"
                >
                  <Text style={{ color: tokens.accent }} className="text-xs font-mono font-bold tracking-wider">
                    {group.inviteCode}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </GradientBackground>
  );
}
