import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
            <View className="bg-sky-sunrise/15 rounded-xl px-4 py-2 border border-sky-sunrise/20 flex-row items-center">
              <Feather name="shield" size={12} color="#FFC857" />
              <Text className="text-sky-sunrise text-xs font-semibold ml-1">LEADER</Text>
            </View>
          }
        />
        <ScrollView contentContainerClassName="px-5 pb-8">
          <View className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <Text className="text-sky-day/60 text-xs mb-1.5 font-medium">INVITE CODE</Text>
            <Text className="text-sky-sunrise text-2xl font-bold tracking-[0.3em]">
              {group?.inviteCode}
            </Text>
            <View className="flex-row items-center mt-2">
              <Feather name="info" size={12} color="#87CEEB" style={{ opacity: 0.5 }} />
              <Text className="text-sky-day/50 text-xs ml-1.5">
                Share this code with friends to join your group
              </Text>
            </View>
          </View>

          <Text className="text-white text-lg font-semibold mb-3 flex-row items-center">
            <Feather name="users" size={18} color="#FFFFFF" />
            <Text className="ml-2">Members</Text>
          </Text>
          <View className="gap-2">
            {sampleMembers.map((member) => (
              <View
                key={member.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-11 h-11 rounded-xl bg-sky-sunrise/15 items-center justify-center mr-3">
                    <Text className="text-sky-sunrise font-bold text-lg">
                      {member.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold">{member.name}</Text>
                    <View className="flex-row items-center mt-0.5">
                      {member.readingStreak > 0 ? (
                        <>
                          <Feather name="zap" size={14} color="#22c55e" />
                          <Text className="text-green-400 text-sm ml-1">
                            {member.readingStreak} day streak
                          </Text>
                        </>
                      ) : (
                        <Text className="text-sky-day/40 text-sm">Reading not started</Text>
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
      <ScrollView contentContainerClassName="px-5 pb-8">
        <View className="flex-row gap-3 mb-6">
          <Button
            title="Create Group"
            onPress={() => { setShowCreate(true); setShowJoin(false); }}
            variant="primary"
            className="flex-1"
            icon={<Feather name="plus" size={16} color="#1a1a2e" />}
          />
          <Button
            title="Join Group"
            onPress={() => { setShowJoin(true); setShowCreate(false); }}
            variant="outline"
            className="flex-1"
            icon={<Feather name="log-in" size={16} color="#FFC857" />}
          />
        </View>

        {showCreate && (
          <View className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Create a Cell Group</Text>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              placeholder="Group name..."
              placeholderTextColor="#87CEEB60"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white mb-3"
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
          <View className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Join a Cell Group</Text>
            <TextInput
              value={inviteCode}
              onChangeText={setInviteCode}
              placeholder="Enter invite code..."
              placeholderTextColor="#87CEEB60"
              autoCapitalize="characters"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg tracking-widest mb-3"
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

        <Text className="text-white text-lg font-semibold mb-3">Your Groups</Text>
        {groups.length === 0 ? (
          <View className="items-center py-16">
            <Feather name="users" size={48} color="#87CEEB" style={{ opacity: 0.5 }} />
            <Text className="text-sky-day/60 text-base mt-4">No groups yet</Text>
            <Text className="text-sky-day/40 text-sm mt-1">Create or join one to get started</Text>
          </View>
        ) : (
          <View className="gap-3">
            {groups.map((group) => (
              <TouchableOpacity
                key={group.id}
                onPress={() => setSelectedGroup(group.id)}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 active:bg-white/10 flex-row items-center"
              >
                <View className="w-12 h-12 rounded-xl bg-sky-sunrise/15 items-center justify-center mr-4">
                  <Feather name="users" size={22} color="#FFC857" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold">{group.name}</Text>
                  <Text className="text-sky-day/60 text-sm mt-0.5">
                    {group.memberCount} members
                  </Text>
                </View>
                <View className="bg-sky-sunrise/10 rounded-lg px-3 py-1.5">
                  <Text className="text-sky-sunrise text-xs font-mono font-bold tracking-wider">
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
